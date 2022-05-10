const express = require('express');
const app = express();
const port = 3000;

const db = require('../bookstore/models/index')

// get all authors
app.get('/authors', (req, res) => {
    db.Author.findAll()
        .then(authors => {
            res.send(authors);
        }
        )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));