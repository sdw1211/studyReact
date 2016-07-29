"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const commentManager = require("./comment/comment.js")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/week5', express.static(__dirname + "/public"));

app.post("/sendAndGet", (req, res) => {
    let commentToAdd = req.body;
    commentManager.add(commentToAdd);
    res.json(commentManager.get());
});

app.get("/get", (req, res) => res.json(commentManager.get()));

app.delete("/deleteAndGet/:key", (req, res) => {
    let key = +req.params.key;
    commentManager.delete(key);
    res.json(commentManager.get());    
});


app.listen(process.env.PORT, () => 
    console.log("Example app listening on port " + process.env.PORT)
);
