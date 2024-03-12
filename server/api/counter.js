const express = require("express");
const app = express.Router();
const User = require('../database/userbase');
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
    const { nickname, gender, typeofperson, contactNumber } = req.body;

    // Create a new user entry using the Mongoose model
    const newUser = new User({

        nickname,
        gender,
        typeofperson,
        contactNumber,
        user:req.user.username
    });

    // Save the new user entry to the database
    newUser.save()
        .then(savedUser => {
            console.log('User created:', savedUser);
            // Redirect to the specified URL after the entry is created
            res.redirect('http://localhost:5173/');
        })
        .catch(error => {
            // If an error occurs during the process, log the error and send an error response
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = app;
