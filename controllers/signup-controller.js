const express = require ("express");
const signupModel = require ("../models/signup-model");
const { render } = require("ejs");

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        userType: "non"
    });
}


exports.postSignup = (req,res,next) => {
    
    let newUser = req.body;
    signupModel.registerNewUser (newUser.username, newUser.email, newUser.password)
        .then(()=> {
            res.redirect ('/login');
        })
        .catch (err => {
            console.log (err);
            res.redirect ('/signup');
        })
}