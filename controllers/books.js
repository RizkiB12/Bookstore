const db = require('../models/index');
const { stringify } = require('nodemon/lib/utils');

// get all books where stock > 0
exports.getAllBooks = (req, res) => {
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
}

// buy book and decrease stock of book
exports.buyBook = (req, res) => {
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
}

// show form to add book
exports.showAddBookForm = (req, res) => {
    db.Author.findAll()
        .then(authors => {
            res.render('addBook', {
                authors: authors
            });
        })
}

// add book
exports.addBook = (req, res) => {
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
}

// get all book where stock = 0
exports.getAllBooksOutOfStock = (req, res) => {
    db.Book.findAll({
        where: {
            stock: 0
        }
    })
        .then(books => {
            res.send(books);
        })
}

// get form to restock book
exports.showRestockBookForm = (req, res) => {
    const bookId = req.params.id;
    res.send(`Form restock book id =  ${bookId} page`);
}

// post update amount stock of book
exports.restockBook = (req, res) => {
    const bookId = req.params.id;
    const updateStock = req.body.updateStock;
    db.Book.findOne({
        where: {
            id: bookId,
        }
    })
        .then(book => {
            book.update({
                stock: parseInt(updateStock),
                updatedAt: new Date(),
            }).then(() => {
                res.send(book);
            })
        })
}

// delete book from database
exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    db.Book.destroy({
        where: {
            id: bookId
        }
    })
        .then(book => {
            res.json({
                message: 'Book deleted',
                book: book
            });
        })
}