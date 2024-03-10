const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const userschema = new mongoose.Schema({
    email:String,
    password:String
});
userschema.plugin(passportLocalMongoose);
userschema.plugin(findOrCreate);
const model = new mongoose.model("user_data",userschema);
module.exports = model;