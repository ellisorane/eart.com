require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // req.body


// Routes

// Test
app.get("/", (req, res) => {
    console.log("Working");
    return res.json("Worked");
});

// Routes
app.use('/auth', require('./routes/auth'));

// Create
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log(req.body)
        return res.json(newTodo);
    } catch (error) {
        console.error(error);
    }
}); 

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});