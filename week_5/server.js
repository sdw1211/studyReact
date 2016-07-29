"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const commentManager = require("./comment/comment.js");
const RouterManager = require("./router/router.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", (new RouterManager(commentManager)).get());
app.use('/week5', express.static(__dirname + "/public"));
  
app.listen(process.env.PORT, () => 
    console.log("Example app listening on port " + process.env.PORT)
);
