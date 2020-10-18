const validationResult = require ("express-validator").validationResult
const cartModel = require ("../models/cart-model");


exports.getCart = (req, res, next) => {

    // get the cart Items of the user
    cartModel.getItemsByUserId (req.session.userId)
        .then (items => 
            res.render ('cart', {
                pageTitle: 'Cart',
                cartErrors: req.flash('cartErrors')[0],
                isUser: req.session.userId,
                items: items
            })
        ).catch (err => {
            console.log (err)
        }) 
}

exports.postCart = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.addNewItem ({
            name: req.body.productName,
            price: req.body.productPrice,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timeStamp: Date.now()
        }).then (() => {
            res.redirect ('/cart');
        }).catch (err => {
            console.log (err)
        })
    }
    else {
        req.flash ('cartErrors', validationResult(req).array());
        res.redirect (req.body.redirectTo);  // redirect them to wherever they came from 
    }
}

exports.editCart = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.updateItemById(req.body.productId, {
          productId: req.body.productId,
          timeStamp: Date.now(),
          amount: req.body.amount
        })
            .then (() => {
                res.redirect ('/cart');
            }).catch (err => {
                console.log (err)
            })
    }
    else {
        req.flash ('cartErrors', validationResult(req).array());
        res.redirect ('/cart');  // redirect them to wherever they came from 
    }
}


exports.deleteFromCart = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.deleteItemById(req.body.productId)
            .then (() => {
                res.redirect ('/cart');
            }).catch (err => {
                console.log (err)
            })
    }
    else {
        req.flash ('cartErrors', validationResult(req).array());
        res.redirect ('/cart');  // redirect them to wherever they came from 
    }
}