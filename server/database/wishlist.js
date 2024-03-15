const findOrCreate = require('mongoose-findorcreate');
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const userschema = new mongoose.Schema({
    Userid : String,
    data: { type: Schema.Types.ObjectId, ref: 'order_data' }
    

});
userschema.plugin(findOrCreate);
const model = new mongoose.model("wishlist_data",userschema);

module.exports = model;