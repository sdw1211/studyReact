"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

var comments = [{name:"Anne Droid", body:"I wanna know what love is...", key:1},
    {name:"Antonio Seo", body:"I love you.", key:2},
    {name:"Rosaria Huh", body:"me too.", key:3}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/week5', express.static(__dirname + "/public"));

app.post("/send", (req, res) => {
    let commentToAdd = req.body;
    let generateKey = () => comments.length + 1;

    commentToAdd.key = generateKey();
    comments.push(commentToAdd);
    res.json(comments);
});

app.get("/get", (req, res) => res.json(comments));

app.delete("/delete/:key", (req, res) => {
    let key = +req.params.key;
    let commentIndexToDelete = comments.findIndex(x => x.key === key);
    const DELETE_ONCE = 1;
    let isExistedComment = (index) => index >= 0;

    if (isExistedComment(commentIndexToDelete)) {
        comments.splice(commentIndexToDelete, DELETE_ONCE);
    }
    
    res.json(comments);    
});


app.listen(process.env.PORT, () => 
    console.log("Example app listening on port " + process.env.PORT)
);
