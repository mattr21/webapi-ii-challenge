
// Step 1 - create this server.js file and move all of the below code from index.js to this file (server.js)
// *************************************
const express = require('express');

// Step 9 - import postsRouter
const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());

// NOTE - the requests (GET, POST, etc) were originally moved to this file in step 1 and then moved to posts-router.js in step 3
// *************************************

// Step 8 - use the router from the posts-router.js file
server.use('/api/posts', postsRouter);

// Step 2 - export this file so it can be imported in index.js
module.exports = server;
