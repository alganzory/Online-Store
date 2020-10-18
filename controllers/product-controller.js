const productsModel = require ("../models/products-model");


exports.getProduct = (req,res,next) => {
    // get id
    const id = req.params.id; 
    // get product from DB
    productsModel.getProductById(id)
        .then(product=> {
            res.render('product', {
                pageTitle: 'View ' + product.name,
                product: product,
                isUser: req.session.userId,
                cartErrors: req.flash('cartErrors')[0]
            })
        })
        .catch (err => {
            console.log (err)
        })
    // render 
}

exports.firstProduct= (req,res,next) => {
    productsModel.getFirstProduct()
        .then(product => {
            res.render ('product', {
                pageTitle: 'View '+ product.name,
                product: product,
                isUser: req.session.userId
            })
        })
}