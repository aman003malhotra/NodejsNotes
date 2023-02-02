const express = require('express');
const path = require('path');
const adminData = require('./admin');


const router = express.Router();
// get post an other will do exact url matching and the use will not do exact matching
router.get("/" ,(req, res, next) => {
    const products = adminData.products;
    // just for view-engine and we don't have to define the path as well as we already declared it in views
    // res.render('shop', {products:products, docTitle:'Shop', path: '/admin/shop'});
    
    // This is for handle bars
    res.render('shop', {products:products, docTitle:'Shop', path: '/admin/shop', hasProducts:products.length > 0 });

    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;