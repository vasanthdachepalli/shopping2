const express = require("express");
const app = express.Router();
const User = require('../database/data');
app.get('/user/type',(req,res)=>{
    User.find({user:req.user.username})
    .then(doc =>{
      
        res.json(doc);
    })
    .catch(error => {
        // If an error occurs during the process, log the error and send an error response
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    })
})

app.post('/user/data', (req, res) => {
    // Extract data from request body
    console.log(req.body);
 let name = req.user.username
  User.create({
    user: name,
    gender:req.body.gender,
    typeofperson:req.body.typeofperson,
    nickname:req.body.nickname,
    contactNumber:req.body.contactNumber
  })
  .then(()=>{
    console.log('created succfullly')
    res.status(200).send('suuccessfull')
  })
  .then(err=>{
    console.log(err);
  })
    // Create a new user entry using the Mongoose model
   
});


const orders = require('../database/orders');
app.get('/order',(req,res)=>{
    orders.find({})
    .then(doc =>{
        res.json(doc);
    })
    .catch(err =>{
        console.log(err);
    })
})
app.get('/singleproduct/:id',(req,res)=>{
    orders.findById(req.params.id)
    .then(doc =>{
        res.json(doc);
    })
    .catch(err =>{
        console.log(err);
    })

})


module.exports = app;
