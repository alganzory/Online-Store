const express = require ("express");
const authModel = require ("../models/auth-model");
const ejs = require("ejs");

exports.getSignup = (req, res, next) => {
    
    res.render('signup', {
        authError: req.flash("authError")[0],
        userType: "non"
    });
}


exports.postSignup = (req,res,next) => {
    
    let newUser = req.body;
    authModel.registerNewUser (newUser.username, newUser.email, newUser.password)
        .then(()=> {
            res.redirect ('/login');
        })
        .catch (err => {
            req.flash('authError', err);
            res.redirect ('/signup');
        })
}