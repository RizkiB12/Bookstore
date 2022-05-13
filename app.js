const express = require('express');
const app = express();
const port = 3000;

const db = require('../bookstore/models/index')

// body parser
const bodyParser = require('body-parser');
const { stringify } = require('nodemon/lib/utils');
const author = require('./models/author');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// 	Menampilkan seluruh author yang ada di database
app.get('/authors', (req, res) => {
    db.Author.findAll({
        include: [{
            model: db.Book,
            as: 'book'
        }]
    })
        // .then(authors => {
        //     res.send(authors)
        // })
        .then(authors => {
            res.render('authors', {
                authors: authors
            });
        })
})

// 	Menampilkan seluruh buku yang ada di database yang memiliki stock lebih dari 0
app.get('/books', (req, res) => {
    db.Book.findAll({
        where: {
            stock: {
                [db.Sequelize.Op.gt]: 0
            }
        },
        include: [{
            model: db.Author,
            as: 'author'
        }]
    })
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
            id: req.params.id,
        }
    })
        .then(book => {
            const updateStock = book.stock - 1;
            book.update({
                stock: updateStock,
                updatedAt: new Date(),
            }).then(() => {
                res.send(book);
            })
        })
})

// Menampilkan form untuk menambahkan buku
app.get('/books/add', (req, res) => {
    db.Author.findAll()
        .then(authors => {
            res.render('addBooks', {
                authors: authors});
        })
  
})

// 	Menambahkan data buku ke database
app.post('/books/add', (req, res) => {
    const title = req.body.title;
    const isbn = req.body.isbn;
    db.Book.create({
        title: title,
        isbn: stringify(title.replace(" ", "_") + isbn),
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

// 	Menampilkan seluruh buku yang ada di database yang memiliki stock 0
app.get('/books/emptylist', (req, res) => {
    db.Book.findAll({
        where: {
            stock: 0
        }
    })
        .then(books => {
            res.render('emptyBook', {
                books: books
                });
        })
})

// Menampilkan form untuk merestock buku
app.get('/books/restock/:id', (req, res) => {
    const bookId = req.params.id;
    res.send(`Restock Book Page ${bookId}`);
})

// Mengupdate jumlah stock buku berdasarkan form restock buku
app.post('/books/restock/:id', (req, res) => {
    const bookId = req.params.id;
    // const updateStock = req.body.updateStock;
    // const incStock = 1
    db.Book.findOne({
        where: {
            id: bookId,
        }
    })
        .then(book => {
            book.update({
                stock: book.stock + 1,
                updatedAt: new Date(),
            }).then(() => {
                res.send(book);
            })
        })
})

// Menghapus buku dari database
app.delete('/books/delete/:id', (req, res) => {
    const bookId = req.params.id;
    db.Book.destroy({
        where: {
            id: bookId
        }
    })
        .then(book => {
            res.send('Successfully deleted book');
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));