const mongoose = require ("mongoose");
const express = require ("express");
const bcrypt = require ("bcrypt");

const DB_URL= "mongodb://localhost:27017/online-store";
const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})
const User = mongoose.model ('user', userSchema);

exports.registerNewUser = (username, email, password) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=> {
            User.findOne({email:email})
                .then(user => {
                    if (user) {
                        reject('There exists an account with this email address');
                        mongoose.disconnect();
                    }
                    else {
                        bcrypt.hash (password, 10)
                            .then( (encryptedPassword) => {
                                let newUser = new User (
                                    {
                                        username: username,
                                        email: email,
                                        password: encryptedPassword
                                    });
                                newUser.save()
                                .then (() => {
                                    resolve();
                                    mongoose.disconnect();
                                })
                                .catch (err => {
                                    reject (err);
                                    mongoose.disconnect();
                                })
                        })
                        
                    }
                })
        })
    })
}


exports.validateLogin = (email, password) => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (()=> {
                User.findOne({email:email})
                    .then (user => {
                        if (!user) {
                            reject ("There is no account associated with this email address")
                            mongoose.disconnect();
                        } else {
                            bcrypt.compare (password, user.password)
                                .then (same => {
                                    if (!same) {
                                        reject ("Incorrect password");
                                        mongoose.disconnect();
                                    } else {
                                        mongoose.disconnect();
                                        resolve ({
                                            id: user._id,
                                            isAdmin: user.isAdmin
                                        });
                                    }
                                })
                        }
                    }).catch (err => {
                        mongoose.disconnect ();
                        reject (err);
                    })
            })
    })
}

exports.UserModel = User;