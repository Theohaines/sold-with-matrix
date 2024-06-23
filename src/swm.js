// Beginning of the sold-with-matrix project By Theo Haines (HAINET03)

const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

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
    res.status(500).sendFile(path.resolve("src/client/pages/landing/index.html"));
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});