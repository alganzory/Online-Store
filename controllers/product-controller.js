const productsModel = require ("../models/products-model");


exports.getProduct = (req,res,next) => {
    // get id
    const id = req.params.id; 
    // get product from DB
    productsModel.getProductById(id)
        .then(product=> {
            res.render('product', {
                userType: "non",
                product: product
            })
        })
    // render 
}

exports.firstProduct= (req,res,next) => {
    productsModel.getFirstProduct()
        .then(product => {
            res.render ('product', {
                userType: 'non',
                product: product
            })
        })
}