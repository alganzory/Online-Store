const express = require ("express");
const authModel = require ("../models/auth-model");
const ejs = require("ejs");

exports.getLogin = (req, res, next) => {
    
    res.render('login', {
        authError: req.flash("authError")[0],
        userType: "non"
    });
}


exports.postLogin = (req,res,next) => {
    
    let user = req.body;
    authModel.validateLogin (user.email, user.password)
        .then (id => {
            req.session.userId =id;
            res.redirect ('/'); 
        })
        .catch (err => {
            req.flash('authError', err);
            res.redirect ('/login')
        });
}