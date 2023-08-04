require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const pool = require("./db");
const passport = require('passport');
const session = require('express-session');


// middleware
app.use(cors());
app.use(express.json()); // req.body


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }));  

app.use(passport.initialize());
app.use(passport.session());

  

// Routes

// Test
app.get("/", (req, res) => {
    console.log("Working");
    return res.json("Worked");
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/cart'));

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});