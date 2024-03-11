const express = require("express");
const app = express.Router();
const User = require('../database/userbase');
app.get('/count', async (req, res) => {
    try {
        if (!req.user) {
            // If req.user does not exist, return JSON with count var as 0
            return res.json({ count: 0 });
        } else {
            // If req.user exists, check if there is any entry in userdata with the username matching req.user.username
            const userEntry = await User.findOne({ username: req.user.username });
            
            // If there is an entry for the user, set count to 2, otherwise set it to 1
            const count = userEntry ? 2 : 1;
            
            // Return count as JSON
            return res.json({ count });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports =app;