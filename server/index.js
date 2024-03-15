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
const cookieSession = require("cookie-session");
const User = require('./database/user');
const cors = require('cors'); 
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



app.use(express.json()); 
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

  app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/login",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ["profile", "email"] 
  },
  function(accessToken, refreshToken, profile, cb) {
    // Check if user exists in the database
    User.findOne({ username: profile.id })
      .then(user => {
        if (user) {
          // If user exists, return the user
          return cb(null, user);
        } else {
          // If user doesn't exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            email: profile.email,
            // Add any other relevant user data here
          });
          // Save the new user to the database
          return newUser.save()
            .then(newUser => {
              // Return the newly created user
              return cb(null, newUser);
            });
        }
      })
      .catch(err => {
        return cb(err);
      });
  }
));


/*
passport.use(
	new GoogleStrategy(
		{
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/login",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ["profile", "email"] 
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);
*/

  app.get("/auth/google",
  passport.authenticate("google", ["profile", "email"])
);

app.get("/auth/google/login",
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    
    // Successful authentication, redirect to react parent code.
    res.redirect('http://localhost:5173/')
  });

  const Userbase = require('./database/userbase');

  app.get('/api/count', async (req, res) => {
    try {     
        if (!req.user) {
            // If req.user does not exist, return JSON with count var as 0
            return res.json({ count: 0 });
        } else {
            // If req.user exists, check if there is any entry in userdata with the username matching req.user.username
            const userEntry = await Userbase.findOne({ user: req.user.username });
            
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
app.use('/upload',require('./api/uploader'));
app.use('/api',require('./api/counter'))
app.listen(8080, function() {
    console.log("Server started on port 8080.");
  });



/*

  const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const mongoose = require('mongoose');
const path = require("path");
const session = require('cookie-session'); // Changed to cookie-session
const passport = require("passport");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const User = require('./database/user');
const cors = require('cors'); 

console.log(process.env.CLIENT_SECRET)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(express.json()); 
app.use(express.static(__dirname+"/assets"));

// Using cookie-session for session management
app.use(session({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
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

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/login",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ["profile", "email"] 
  },
  function(accessToken, refreshToken, profile, cb) {
    // Check if user exists in the database
    User.findOne({ username: profile.id })
      .then(user => {
        if (user) {
          // If user exists, return the user
          return cb(null, user);
        } else {
          // If user doesn't exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            email: profile.email,
            // Add any other relevant user data here
          });
          // Save the new user to the database
          return newUser.save()
            .then(newUser => {
              // Return the newly created user
              return cb(null, newUser);
            });
        }
      })
      .catch(err => {
        return cb(err);
      });
  }
));

app.get("/auth/google",
  passport.authenticate("google", ["profile", "email"])
);

app.get("/auth/google/login",
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    
    // Successful authentication, redirect to react parent code.
    res.redirect('http://localhost:5173/')
  });

const Userbase = require('./database/userbase');

app.get('/api/count', async (req, res) => {
    try {     
        if (!req.user) {
            // If req.user does not exist, return JSON with count var as 0
            return res.json({ count: 0 });
        } else {
            // If req.user exists, check if there is any entry in userdata with the username matching req.user.username
            const userEntry = await Userbase.findOne({ user: req.user.username });
            
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

app.use('/upload',require('./api/uploader'));
app.use('/api',require('./api/counter'))

app.listen(8080, function() {
    console.log("Server started on port 8080.");
});



*/