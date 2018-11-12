const path = require('path');
const express = require('express');
const bosyParser = require("body-parser");
const notes = require("./apis/notes");
const auth = require("./apis/auth");
const connection = require('./mysql.js');
const app = express();
app.use("/images", express.static(path.join(__dirname, "images")));
//will allow front-end to access data from backend/images
//and now it can do so by making request to /images rather than backend/images
//proxy request

app.use("/", express.static(path.join(__dirname, "angular")));
//because we are hosting angular and node app at the same place

app.use(bosyParser.json())
app.use(bosyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
})

app.use('/api/notes', notes);
app.use('/api/auth', auth);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"))
});
//because we are hosting angular and node app at the same place



module.exports = app;
