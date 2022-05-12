const express = require('express');

const router = express.Router();
const booksController = require('../controllers/books');

router.get('/books', booksController.getAllBooks);
router.get('/books/buy/:id', booksController.buyBook);
router.get('/books/add', booksController.showAddBookForm);
router.post('/books/add', booksController.addBook);
router.get('/books/emptylist', booksController.getAllBooksOutOfStock);
router.get('/books/restock/:id', booksController.showRestockBookForm);
router.post('/books/restock/:id', booksController.restockBook);
router.delete('/books/delete/:id', booksController.deleteBook);

module.exports = router;