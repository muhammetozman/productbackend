require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const productController = require('./controllers/productController');

var app = express();
app.use(bodyparser.json())
app.listen(3003, () => {
    console.log('Express server started at port : 3003');
});

app.use('/api', productController);