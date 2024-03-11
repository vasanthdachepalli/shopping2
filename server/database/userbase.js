const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    user:String,
    gender:String,
    typeofperson:String,
    nickname:String,
    contactNumber:Number

});
const model = new mongoose.model("user_data",userschema);
module.exports = model;