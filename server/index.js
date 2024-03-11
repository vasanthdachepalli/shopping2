const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const mongoose = require('mongoose');
const path = require("path");
const session = require('express-session');
const passport = require("passport");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const User = require('./database/user');

console.log(process.env.CLIENT_SECRET)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname+"/assets"));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  mongoose.connect("mongodb+srv://newproject2177:Vasanth@cluster0.etisoaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  passport.use(User.createStrategy());
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
  
  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/login",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {

  
      User.findOrCreate({ username: profile.id }, function (err, user) {
        return cb(err, user);

      });
    }
  ));


  app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/login",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to react parent code.
    res.send('http://localhost:3000/')
  });

app.use("/api",require('./api/counter'));
app.listen(8080, function() {
    console.log("Server started on port 8080.");
  });