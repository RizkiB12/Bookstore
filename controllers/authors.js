const db = require('../models/index');

// get all authors
exports.getAllAuthors = (req, res) => {
    db.Author.findAll({
        include: [{
            model: db.Book,
            as: 'book'
        }]
    })
        .then(authors => {
            res.render('authors', {
                authors: authors
            });
        })
}