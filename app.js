// initialize express server
const express = require('express');
const app = express();
const port = 3000;

// initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initilize routes
const authorsRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');
app.use('/', authorsRoutes);
app.use('/', bookRoutes);

// initilize set ejs as view engine
app.set('view engine', 'ejs');

// serve server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));