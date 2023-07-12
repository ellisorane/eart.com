require('dotenv').config()
const express = require('express');
const pool = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists in the database
                const query = 'SELECT * FROM users WHERE user_email = $1';
                const result = await pool.query(query, [profile.id]);
        
                if (result.rowCount === 0) {
                // User does not exist, create a new user entry in the database
                const insertQuery = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)';
                await pool.query(insertQuery, [ profile.displayName, profile.emails[0].value, profile.id]);
                }

                // Call the done callback with the user object
                done(null, profile);
            } catch (error) {
                console.error('Error handling Google authentication:', error);
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serialized user:" + JSON.stringify(user));
    // done(null, user.id); // Store the user ID in the session
    done(null, user); // Store the user ID in the session
});

passport.deserializeUser((user, done) => {
    // Fetch user from the database based on the ID
    done(null, user); // Store the user ID in the session

});


const router = express.Router();

// @route   GET /auth/google
// @desc    Login/Signup with Google
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// @route   GET /auth/google/callback
// @desc    Google auth callback
// @access  Private
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success', 
    failureRedirect: '/auth/google/failure'
 }),
  (req, res) => {
    
  }
);

router.get('/google/success', (req, res) => {
    res.json({ msg: 'Google auth successful.' });
})

router.get('/google/failure', (req, res) => {
    res.json({ msg: 'Google auth failed.' });
})

// @route   GET /auth/
// @desc    Get user
// @access  Private
router.get('/', async (req, res) => {
    res.json('success');
});

// @route   POST /auth/signup
// @desc    Create User
// @access  Public
router.post('/signup', async (req, res) => {
    try {
        const { user_name, user_email, user_password } = req.body;

        // Hash password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user_password, salt);
        
        // Insert the user into the database
        const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)';
        const result = await pool.query(query, [user_name, user_email, hashedPassword]);

        // Login new user
        const query2 = 'SELECT * FROM users WHERE user_email = $1';
        let result2 = await pool.query(query2, [user_email]);

        // Extract user from the login result
        const user = result2.rows[0];
        // console.log(user);

        // Create JWT token - Expires every 48 hours
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2d' })

        res.json({
            token: token,
            user,
            msg: "User created successfully"
        })
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error creating user.' });
    }
});


// @route   POST /auth/login
// @desc    Login User
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        
        // Check db for matching user_email
        const query = 'SELECT * FROM users WHERE user_email = $1';
        let result = await pool.query(query, [user_email]);

        if (result.rowCount === 0) {
            // User does not exist
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const user = result.rows[0];

        // Validate user_password
        const passwordsMatch = await bcrypt.compare(user_password, user.user_password);

        if (!passwordsMatch) {
          // Incorrect password
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create JWT token - Expires every 48 hours
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2d' })

        res.json({
            token: token,
            user,
            msg: "Logged in successfully"
        })
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error logging in.' });
    }
});

// @route   DELETE /auth/:id
// @desc    Delete User
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = "DELETE FROM users WHERE id = $1"
        const result = await pool.query(query, [id]);
        res.json("Deleted user successfully");
    } catch (error) {
        console.error(error);
        
    }
});


module.exports = router;
