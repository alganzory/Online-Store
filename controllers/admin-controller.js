const validationResult = require("express-validator").validationResult;
const productsModel = require ('../models/products-model');

exports.getAdd = (req,res,next) => {
    res.render ('add-product', {
        pageTitle:'Add product',
        inputErrors: req.flash ('inputErrors'),
        isUser: true,
        isAdmin: true
    })
}

exports.postAdd = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        productsModel.newProduct ({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            img: req.file.filename,
            description: req.body.description
        })
            .then((newProductId)=> {
                res.redirect('/product/'+newProductId);
            })
            .catch (err => {
                console.log (err);
            })
    } else {
        req.flash ('inputErrors', validationResult(req).array());
        res.redirect ('/admin/add');
    }
}