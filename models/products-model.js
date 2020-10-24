const mongoose = require ("mongoose");


const DB_URL= "mongodb://localhost:27017/online-store";

const productSchema = mongoose.Schema ({
    name: String,
    img: String,
    price: Number,
    category: String,
    description: String
})
const Product = mongoose.model ("product", productSchema)

exports.getAllProducts = ()=> {

    // we are creating our custome promise so we can contol 
    // when it will be resolved so we are ultimately able 
    // to return the products as well as disconnect the db
    return new Promise ((resolve, reject )=> {
         // connect to DB
        mongoose.connect (DB_URL)
        .then (() => {Product.find().
            then (products => {
                mongoose.disconnect();
                resolve (products);
            }).catch (err => reject (err))
        })
        .catch(err => reject (err))
    })  
}

exports.getProductsByCategory = (category) => {
    return new Promise ((resolve, reject )=> {
        // connect to DB
       mongoose.connect (DB_URL)
       .then (() => {
           Product.find({category: category})
            .then (products => {
                    mongoose.disconnect();
                    resolve (products);
                }).catch (err => {
                    reject (err);
                    mongoose.disconnect();
                })
            })
            .catch (err => {
                reject (err);
                mongoose.disconnect();
            })
        .catch (err => reject(err))
   })  
}

exports.getProductById =(id) => {
    return new Promise ((resolve, reject )=> {
        // connect to DB
       mongoose.connect (DB_URL)
        .then (() => {
            Product.findById(id)
                .then (product => {
                    resolve (product);
                    mongoose.disconnect();
                })
                .catch (err => {
                    reject (err)
                    mongoose.disconnect();
                })
        })
        .catch (err => reject (err))
        
   })  
}

exports.getFirstProduct = () => {
    return new Promise ((resolve, reject )=> {
        // connect to DB
        mongoose.connect (DB_URL)
            .then (() => {
                Product.findOne()
                    .then (product => {
                    mongoose.disconnect();
                    resolve (product);
                    })
                    .catch (err => reject (err))
            })    
    })  
}

exports.newProduct = data => {
    return new Promise ((resolve,reject) => {
        mongoose.connect(DB_URL)
            .then (() => {
                let newProduct = new Product (data);
                newProduct.save()
                    .then(()=> {
                        resolve(newProduct._id);
                        mongoose.disconnect();
                    })
                    .catch(err=> {
                        reject(err);
                        mongoose.disconnect();
                    })
            })
            .catch (err => reject (err))
    })
}