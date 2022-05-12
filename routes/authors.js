const express = require('express');

const router = express.Router();
const authorsController = require('../controllers/authors');

router.get('/authors', authorsController.getAllAuthors)

module.exports = router;