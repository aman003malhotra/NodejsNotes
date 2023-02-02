const express = require('express');
const path = require('path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.render('add-product', {docTitle:'Add Product', path: '/admin/add-product'});
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html') );
    // next(); // Allows the request to continue to the next middleware
});

// /admin/add-product => POST
// we can use get, post , patch, put in place of use
router.post("/add-product", (req,res, next) => {
    products.push({title:req.body.title})
    console.log(req.body)
    res.redirect('/');
});


module.exports.routes = router;
module.exports.products = products;