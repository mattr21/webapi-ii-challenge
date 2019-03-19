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

server.listen(4000, () => {
    console.log('\n*** API up and running on port 4k ***\n')
});