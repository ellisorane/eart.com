const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes

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
// Get all 
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        return res.json(allTodos.rows);
    } catch (error) {
        console.error(error);
    }
}); 
// Get single 
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        return res.json(todo.rows);
    } catch (error) {
        console.error(error);
    }
}); 
// Update
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo updated successfully");
    } catch (error) {
        console.error(error);
    }
}); 
// Delete
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted todo successfully");
    } catch (error) {
        console.error(error);
    }
}); 

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});