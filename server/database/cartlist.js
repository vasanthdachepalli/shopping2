
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const userschema = new mongoose.Schema({
    Userid : String,
    data: [{ type: Schema.Types.ObjectId, ref: 'order_data' }]
});
const model = new mongoose.model("cartlist_data",userschema);
module.exports = model;