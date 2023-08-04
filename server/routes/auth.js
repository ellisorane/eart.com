require('dotenv').config()
const express = require('express');
const pool = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { authenticate } = require('../middleware');

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
                const result = await pool.query(query, [profile.emails[0].value]);
                
                if (result.rowCount === 0) {
                // User does not exist, create a new user entry in the database
                const insertQuery = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)';
                await pool.query(insertQuery, [ profile.displayName, profile.emails[0].value, profile.id]);
                }

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

passport.serializeUser((user, done) => {
    done(null, user.emails[0].value); // Store the user email in the session
});

passport.deserializeUser(async(user_email, done) => {
    try {
        // Fetch user from the database based on the email store in the session
        const query = 'SELECT * FROM users WHERE user_email = $1';
        const result = await pool.query(query, [user_email]);
    
        if (result.rowCount === 0) {
            done(new Error('User not found'), null);
        } else {
            const user = result.rows[0];
            done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
    done(null, user_email); 

});



// @route   GET /auth/google
// @desc    Login/Signup with Google
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// @route   GET /auth/google/callback
// @desc    Google auth callback
// @access  Private
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure'
 }),
  (req, res) => {
    res.redirect('/auth/google/user');
  }
);

router.get('/google/user', (req, res) => {
    res.json({ msg: "Logged in Google user: ", user: req.user });
})

router.get('/google/failure', (req, res) => {
    res.json({ msg: 'Google auth failed.' });
})

// @route   GET /auth/
// @desc    Get user
// @access  Private
router.get('/', authenticate, async (req, res) => {
    try {
        res.json(req.user);
        
    } catch (error) {
        console.error(error);
        res.json(error);
    }
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

// @route   DELETE /auth/
// @desc    Delete User
// @access  Private
router.delete('/', authenticate, async (req, res) => {
    try {
        const id = req.user.id;
        const query = "DELETE FROM users WHERE id = $1"
        const result = await pool.query(query, [id]);
        res.json("Deleted user successfully");
    } catch (error) {
        console.error(error);
        
    }
});


module.exports = router;
