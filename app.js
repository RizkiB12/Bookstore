const express = require('express');
const app = express();
const port = 3000;

const db = require('../bookstore/models/index')

// get all authors
app.get('/authors', (req, res) => {
    db.Author.findAll()
        .then(authors => {
            res.send(authors);
        })
})

app.get('/books', (req, res) => {
    db.Book.findAll()
        .then(books => {
            res.send(books);
        })
})

app.get('/books/buy/:id', (req, res) => {
    db.Book.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(book => {
            res.send(book);
        })
})

app.post('/books/buy/:id', (req, res) => {
    db.Book.findByPk(req.params.id)
        .then(book => {
            book.update({
                quantity: book.quantity - 1
            })
            res.send(book);
        })
})

app.get('/books/emptyList', (req, res) => {
    db.Book.destroy()
        .then(book => {
            res.send(book);
        })
})

app.get('/books/restock/:id', (req, res) => {
    db.Book.findByPk(req.params.id)
        .then(book => {
            res.send(book);
        })
})

app.put('/books/restock/:id', (req, res) => {
    db.Book.findByPk(req.params.id)
        .then(book => {
            book.update({
                quantity: book.quantity + 1
            })
            res.send(book);
        })
})

app.delete('/books/delete/:id', (req, res) => {
    db.Book.destroy({
        where: {
            id: req.params.id
        }
    }).then(book => {
        res.send(book);
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));