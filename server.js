
// Step 1 - move all of the below code from index.js to this file (server.js)
// *************************************
const express = require('express');

const db = require ('./data/db.js');

const server = express();

server.use(express.json());

// GET - retrieve all posts
server.get('/api/posts', (req, res) => {
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
server.get('/api/posts/:id', (req, res) => {
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
server.post('/api/posts', (req, res) => {
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
server.delete('/api/posts/:id', (req, res) => {
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
server.put('/api/posts/:id', (req, res) => {
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

// Step 2 - export this file so it can be imported in index.js
module.exports = server;
