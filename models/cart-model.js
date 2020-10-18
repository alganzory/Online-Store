const mongoose = require ('mongoose')

const DB_URL= "mongodb://localhost:27017/online-store";
const cartSchema = mongoose.Schema({
    name:String,
    amount:Number,
    price: Number,
    userId: String,
    productId: String,
    timeStamp: Number

})
const CartItem = mongoose.model ('cart', cartSchema);

exports.addNewItem = data => {
    return new Promise ((resolve,reject)=> { 
        mongoose.connect(DB_URL)
            .then(()=> {
                // firstly check if the item has previously been added to the cart
                // of this user
                CartItem.findOne({userId: data.userId, productId: data.productId})
                    .then (existingItem => {
                        if (existingItem) {
                            existingItem.amount += (+data.amount);
                            existingItem.timeStamp = Date.now();
                            return existingItem.save();
                        }
                        else {
                            let newItem = new CartItem (data);
                            return newItem.save();
                        }
                    })
                        .then(() => {
                            mongoose.disconnect();
                            resolve();
                        })
                        .catch(saveErr => {
                            mongoose.disconnect();
                            reject (saveErr);
                        })
                    .catch (findErr => {
                        console.log (findErr)
                    })
            })
            .catch ( connectionErr => {
                console.log (connectionErr)
            })
    })
}

exports.getItemsByUserId = userId => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                CartItem.find ({userId: userId}, {}, {sort: {timeStamp: -1}})
                    .then (result => {
                        resolve (result);
                        mongoose.disconnect();
                    })
                    .catch (err => {
                        reject (err);
                        mongoose.disconnect();
                    })
            })
    })
}



exports.updateItemById = (cartId, newData) => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                mongoose.set('useFindAndModify', false);
                CartItem.findByIdAndUpdate (cartId, newData)
                    .then ( ()=> {
                        resolve ();
                        mongoose.disconnect();
                    })
                    .catch (err => {
                        reject (err);
                        mongoose.disconnect();
                    })
            })
    })
}


exports.deleteItemById = cartId => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                mongoose.set('useFindAndModify', false);
                CartItem.findByIdAndDelete (cartId)
                    .then ( ()=> {
                        resolve ();
                        mongoose.disconnect();
                    })
                    .catch (err => {
                        reject (err);
                        mongoose.disconnect();
                    })
            })
    })
}