const mongoose = require ('mongoose')

const DB_URL= "mongodb://localhost:27017/online-store";
const orderSchema = mongoose.Schema({
    name:String,
    amount:Number,
    price: Number,
    userId: String,
    productId: String,
    timeStamp: Number,
    address: String,
    status: Number

})
const Order = mongoose.model ('order', orderSchema);


exports.addNewOrder= data => {
    return new Promise ((resolve,reject)=> { 
        mongoose.connect(DB_URL)
            .then(()=> {
                let newItem = new Order (data);
                return newItem.save();
            })
                .then(() => {
                    mongoose.disconnect();
                    resolve();
                })
                .catch(saveErr => {
                    mongoose.disconnect();
                    reject (saveErr);
                })
            .catch ( connectionErr => {
                console.log (connectionErr)
            })
    })
}



exports.addManyOrders= (items,address) => {
    return new Promise ((resolve,reject)=> { 
        mongoose.connect(DB_URL)
            .then(()=> {
                let newOrders= [];
                for (let item of items){
                    newOrders.push(
                        new Order({
                        name: item.name,
                        price: item.price,
                        amount: item.amount,
                        userId: item.userId,
                        productId: item.productId,
                        timeStamp: Date.now(),
                        address:address,
                        status: 0
                        })
                    )
                }
                return Order.insertMany(newOrders);
            })
                .then(() => {
                    mongoose.disconnect();
                    resolve();
                })
                .catch(saveErr => {
                    mongoose.disconnect();
                    reject (saveErr);
                })
    
            .catch ( connectionErr => {
                console.log (connectionErr)
            })
    })
}

exports.getOrdersByUserId = userId => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                Order.find ({userId: userId}, {}, {sort: {timeStamp: -1}})
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



exports.updateOrderById = (orderId, newData) => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                mongoose.set('useFindAndModify', false);
                Order.findByIdAndUpdate (orderId, newData)
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

exports.deleteOrderById = orderId => {

    return new Promise ((resolve, reject) => {
        mongoose.connect (DB_URL)
            .then (() => {
                mongoose.set('useFindAndModify', false);
                Order.findByIdAndDelete (orderId)
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