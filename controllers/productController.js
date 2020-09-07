const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Product = mongoose.model('Product');


router.get('/product', (req, res) => {
    
    Product.find({}, (err, product) => {

        if (err) console.error(err);

        res.json( {product}) 
    })
});

router.get('/product/:id', (req, res) => {
 
   Product.findById(req.params.id).then(data => {
   res.send(data)
})
 });


 router.put('/product/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body,  (err, updatedProduct) => {
    res.json(updatedProduct);
    }); 
});

 router.delete('/product/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
        res.send({
          success: false,
          error: err
        });
      } else {
        res.send({
          success: true,
          item: req.params.id
        });
      }
  
});

});


router.post('/product', (req, res) => {
        insertRecord(req, res);
});
 


function insertRecord(req, res) {
    var product = new Product();
    product.name = req.body.name;
    product.productdate = req.body.productdate;
    product.barcodee = req.body.barcodee;
    product. expiration = req.body. expiration;
  

    product.save((err, doc) => {
        if (!err){
            res.send(doc)
        } 
            // res.redirect('product/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("product", {
                    viewTitle: "Insert Product",
                    product: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'productdate':
                body['productdateError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


module.exports = router;