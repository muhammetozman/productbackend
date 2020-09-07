const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    productdate: {
        type: String
    },
    barcode: {
        type: String
    },
    expiration: {
        type: String
    },

},{versionKey:false});



mongoose.model('Product', productSchema);
