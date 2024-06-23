// Beginning of the sold-with-matrix project By Theo Haines (HAINET03)

const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

//app??!!?
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//External scripts
const getCategory = require('./server/scripts/getcategory.js');

//Resource routes
app.use("/", express.static(path.resolve('src/client')));
app.use("/styles", express.static(path.resolve('src/client/styles')));
app.use("/scripts", express.static(path.resolve('src/client/scripts')));
app.use("/media", express.static(path.resolve('src/client/media')));
app.use("/fonts", express.static(path.resolve('src/client/fonts')));

//Page routes
app.use("/landing", express.static(path.resolve('src/client/pages/landing')));

//Get
app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("src/client/pages/landing/index.html"));
});

app.get("/storeselector", (req, res) => {
    res.status(200).sendFile(path.resolve("src/client/pages/landing/index.html"));
});

app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve("src/client/pages/landing/index.html"));
});

//Database querys
app.use("/getcategory", async (req, res) => {
    var products = await getCategory.getCategory(req.body.category);

    if (products == "err"){
        res.status(400).sendFile("src/client/pages/landing/index.html");
    } else {
        res.status(200).json({products});
    }
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});