// Step 4a - create a router
const express = require('express');

// Step 10 - copy/paste the below line from server.js to this file
const db = require('../data/db.js');

// Step 4b
const router = express.Router();

// Step 5 - change 'server' in below requests to 'router' (Ex. server.get(...) changes to router.get(...))

// Step 3 - create a new folder for posts (or whatever you're working with) and move the below code from router.js to this file (posts-router.js) 
// *************************************

// Step 9 - replace /api/posts with / from all requests. We do this because we setup the router in server.js to include this so we don't have to here 

// GET - retrieve all posts
router.get('/', (req, res) => {
    db
        .find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

// GET = retrieve specific post by id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db
        .findById(id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
});

// POST - add new post
router.post('/', (req, res) => {
    console.log(req.body)
    const postInfo = req.body;

    if(!postInfo.title || !postInfo.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    db
        .insert(postInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })    
});

// DELETE - delete specific post by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db
        .remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
});

// PUT - changes specific post by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(!changes.title || !changes.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

    db
        .update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." });
        })
});
// *************************************

// Step 6 - export this file so it can be imported in server.js
module.exports = router;
