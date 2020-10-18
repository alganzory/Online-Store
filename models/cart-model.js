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
                let newItem = new CartItem (data);
                newItem.save()
                    .then(() => {
                        mongoose.disconnect();
                        resolve();
                    })
                    .catch(err => {
                        mongoose.disconnect();
                        reject (err);
                    })
            }).catch (() => {
                console.log ('unable to connect')
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



exports.updateItemById = (productId, newData) => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                mongoose.set('useFindAndModify', false);
                CartItem.findByIdAndUpdate (productId, newData)
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


exports.deleteItemById = productId => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                mongoose.set('useFindAndModify', false);
                CartItem.findByIdAndDelete (productId)
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