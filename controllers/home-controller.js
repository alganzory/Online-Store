
// import the products model

const productsModel = require ("../models/products-model");

exports.getHome = (req,res,next) => {

    // get the products
    productsModel.getAllProducts()
        .then(products=> {
            res.render ("index", {
                userType: "not",
                products: products
            })
        })
    // render the page
}