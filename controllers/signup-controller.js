const express = require ("express");
const authModel = require ("../models/auth-model");
const ejs = require("ejs");
const validationResult = require ("express-validator").validationResult

exports.getSignup = (req, res, next) => {
    
    res.render('signup', {
        authError: req.flash("authError")[0],
        userType: "non",
        validationErrors: req.flash("validationErrors"),
        isUser: req.session.userId
    });
}


exports.postSignup = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        let newUser = req.body;
        authModel.registerNewUser (newUser.username, newUser.email, newUser.password)
            .then(()=> {
                res.redirect ('/login');
            })
            .catch (err => {
                req.flash('authError', err);
                res.redirect ('/signup');
            })
    } else {
        req.flash ('validationErrors', validationResult(req).array());
        res.redirect('/signup')
    }
}