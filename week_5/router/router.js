"use strict";

const express = require('express');

class RouterManager {
    constructor(commentManager) {
        this.commentManager = commentManager;
    }
    
    get() {
        const router = express.Router();
        
        router.post("/sendAndGet", (req, res) => {
            const commentToAdd = req.body;
            this.commentManager.add(commentToAdd);
            res.json(this.commentManager.get());
        });
        
        router.get("/get", (req, res) => res.json(this.commentManager.get()));
        
        router.delete("/removeAndGet/:key", (req, res) => {
            const key = +req.params.key;
            this.commentManager.remove(key);
            res.json(this.commentManager.get());
        });
        
        return router;
    }    
}

module.exports = RouterManager;