// Beginning of the sold-with-matrix project By Theo Haines (HAINET03)

const express = require('express');
const session = require("express-session");
const path = require('path');
const dotenv = require('dotenv').config();

//app??!!?
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }, //lol false
    }),
);

const requireAuth = (req, res, next) => {
    if (req.session.store || process.env.DEV) {
        next();
    } else {
        res.status(400).redirect("/landing");
    }
};


//External scripts
const toolkit = require('./server/scripts/toolkit.js');
const getCategory = require('./server/scripts/getcategory.js');
const addProduct = require('./server/scripts/product/addproduct.js');

//Resource routes
app.use("/", express.static(path.resolve('src/client')));
app.use("/styles", express.static(path.resolve('src/client/styles')));
app.use("/scripts", express.static(path.resolve('src/client/scripts')));
app.use("/media", express.static(path.resolve('src/client/media')));
app.use("/fonts", express.static(path.resolve('src/client/fonts')));

//Page routes
app.use("/landing", express.static(path.resolve('src/client/pages/landing')));
app.use("/admin", requireAuth, express.static(path.resolve('src/client/pages/admin')));

//Get
app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("src/client/pages/landing/index.html"));
});

app.get("/admin", requireAuth, (req, res) => {
    res.status(200).sendFile(path.resolve("src/client/pages/admin/index.html"));
});

//Database querys
app.use("/getcategory", requireAuth, async (req, res) => {
    var products = await getCategory.getCategory(req.body.category, req.session.store);

    if (products == "err"){
        res.status(400).sendFile("src/client/pages/landing/index.html");
    } else {
        res.status(200).json({products});
    }
});

app.use("/getstores", async (req, res) => {
    var stores = await toolkit.getAllStores();

    if (stores == "err"){
        res.status(400).sendFile(path.resolve("src/client/pages/landing/index.html"));
    } else {
        res.status(200).json({stores});
    }
});

app.use("/logintostore", async (req, res) => {
    var validated = await toolkit.validateStore(req.body.store);

    if(!validated){
        res.status(400).sendFile(path.resolve("src/client/pages/landing/index.html"));
    } else {
        req.session.store = req.body.store;
        res.status(200).json({validated});
    }
});

app.use("/getallcategorys", async (req, res) => {
    var categorys = await toolkit.getAllCategorys();

    if (categorys == "err"){
        res.status(400).sendFile(path.resolve("src/client/pages/landing/index.html"));
    } else {
        res.status(200).json({categorys});
    }
});

app.use("/addProduct", requireAuth, async (req, res) => {
    console.log(req.body, req.session.store)

    var validated = await addProduct.addProduct(req.body.name, req.body.sku, req.body.category, req.session.store);

    if (validated == "err"){
        res.status(400).sendFile(path.resolve("src/client/pages/landing/index.html"));
    } else {
        res.status(200).json({validated});
    }
});

app.use("/getallproducts", requireAuth, async (req, res) => {
    var products = await toolkit.getAllProducts(req.session.store);

    if (products == "err"){
        res.status(400).sendFile(path.resolve("src/client/pages/landing/index.html"));
    } else {
        res.status(200).json({products});
    }
});


app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});