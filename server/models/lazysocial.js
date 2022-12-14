let mongoose = require('mongoose');
//create lazysocial model
let lazysocialModel = mongoose.Schema
({
    name: String,
    catagory: String,
    description: String,
    stock: Number,
    price: Number,
},
{
    collection: "entries",
}
);

module.exports = mongoose.model('Lazysocial', lazysocialModel);
