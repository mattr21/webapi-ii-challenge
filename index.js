// Step 3 - import the server file
const server = require('./server.js');

server.listen(4000, () => {
    console.log('\n*** API up and running on port 4k ***\n');
});