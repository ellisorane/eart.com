require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const pool = require("./db");
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



// middleware
app.use(cors());
app.use(express.json()); // req.body


app.use(session({
    secret: process.env.SESSION_SECRET,
    // The resave option determines whether the session should be saved to the session store on every request, even if it hasn't been modified. Setting it to false improves performance.
    resave: false,
    // The saveUninitialized option determines whether to save uninitialized sessions to the store. Setting it to true allows the session to be stored even if it hasn't been modified.
    saveUninitialized: false,
    cookie: { secure: false },
    // The store option specifies the session store implementation. In this case, we're using connect-pg-simple and passing it a PostgreSQL connection pool (pool) to store the session data in the database.
    // store: new pgSession({
    //     pool: pool, // PostgreSQL connection pool
    //   }),
  }));  

app.use(passport.initialize());
app.use(passport.session());

  

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // // Check if the user already exists in the database
                // const query = 'SELECT * FROM users WHERE user_email = $1';
                // const result = await pool.query(query, [profile.id]);
        
                // if (result.rowCount === 0) {
                // // User does not exist, create a new user entry in the database
                // const insertQuery = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)';
                // await pool.query(insertQuery, [ profile.displayName, profile.emails[0].value, profile.id]);
                // }

                // Call the done callback with the user object
                console.log('Strategy profile: ', profile); 
                done(null, profile);
            } catch (error) {
                console.error('Error handling Google Strategy:', error);
                done(error, null);
            }
        }
    )
);

// This line defines the serialization process for storing the user data in the session. The serializeUser function is called when the user is authenticated, and it determines which data should be stored in the session. In this case, we're storing the id of the user. 
// This is what gets stored in the session
passport.serializeUser((user, done) => {
    done(null, user.emails[0].value); // Store the user email in the session
});

// This block of code defines the deserialization process for retrieving the user data from the session. The deserializeUser function is called on subsequent requests to load the user data based on the stored id in the session.
// This is what gets fetched from the session
passport.deserializeUser(async(user_email, done) => {
    try {
        // Fetch user from the database based on the email
        const query = 'SELECT * FROM users WHERE user_email = $1';
        const result = await pool.query(query, [user_email]);
    
        if (result.rowCount === 0) {
            done(new Error('User not found'), null);
        } else {
            const user = result.rows[0];
            done(null, user);
        }
      } catch (error) {
        console.error('Error deserializing user:', error);
        done(error, null);
      }
    done(null, user_email); 


});


// @route   GET /auth/google
// @desc    Login/Signup with Google
// @access  Public
app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// @route   GET /auth/google/callback
// @desc    Google auth callback
// @access  Private
app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success', 
    failureRedirect: '/auth/google/failure'
 }),
  (req, res) => {
    
  }
);

app.get('/google/success', (req, res) => {
    res.json({ msg: 'Google auth successful.' });
})

app.get('/google/failure', (req, res) => {
    res.json({ msg: 'Google auth failed.' });
})


app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});