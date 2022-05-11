const express = require('express');
const app = express();
const port = 3000;

const db = require('../bookstore/models/index')

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// 	Menampilkan seluruh author yang ada di database
app.get('/authors', (req, res) => {
    db.Author.findAll()
        .then(authors => {
            res.render('authors', {
                authors: authors
                });
        })
})

// 	Menampilkan seluruh buku yang ada di database yang memiliki stock lebih dari 0
app.get('/books', (req, res) => {
    db.Book.findAll()
        .then(books => {
            res.render('books', {
                books: books
                });
        })
})

// 	Membeli buku dari bookstore dan mengurangi stock dari buku
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

// Menampilkan form untuk menambahkan buku
app.get('/books/add', (req, res) => {
    res.send('Add Book Page');
})

// 	Menambahkan data buku ke database
app.post('/books/add', (req, res) => {
    // return res.send(req.body);
    db.Book.create({
        title: req.body.title,
        isbn: req.body.isbn,
        price: req.body.price,
        stock: req.body.stock,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: req.body.authorId,
    })
        .then(book => {
            res.status(201).send(book);
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));