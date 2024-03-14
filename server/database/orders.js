const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    Sellerid : String,
    productName: String,
    productDescription: String,
    brandName: String,
    category: String,
    photo: String, // Change to single photo
    cost: Number,
    shippingDays: String

});
const model = new mongoose.model("order_data",userschema);
module.exports = model;