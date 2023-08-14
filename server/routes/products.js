require('dotenv').config()
const express = require('express');
const pool = require("../db");
const router = express.Router();
const { authenticate } = require('../middleware');

// @route   GET /products/
// @desc    Get all products
// @access  Public
// @status  DONE
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        let result = await pool.query(query);

        if (result.rowCount === 0) {
            // User does not exist
            return res.json('No products found.');
        }
    
        const products = result.rows;

        console.log(products);
        res.json(products);
    } catch (error) {
        console.error(error);
    }
});

// @route   POST /products/
// @desc    Create product
// @access  Private
// @status  IN PROGRESS - Needs image upload feature
router.post('/', authenticate, async (req, res) => {
    try {
        const { product_name, product_description, product_price, product_image_name, product_image_url } = req.body;

        // Insert the product into the database
        const query = 'INSERT INTO products (product_name, product_description, product_price, product_image_name, product_image_url) VALUES ($1, $2, $3, $4, $5)';
        const result = await pool.query(query, [product_name, product_description, product_price, product_image_name, product_image_url]);

        res.json('Product created successfully.');
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error creating product.' });
    }
});

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
// @status  DONE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const query = "DELETE FROM products WHERE id = $1"
        const result = await pool.query(query, [id]);
        res.json("Deleted product successfully");
    } catch (error) {
        console.error(error);
        
    }
});

module.exports = router;
