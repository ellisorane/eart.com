require('dotenv').config();
const express = require('express');
const pool = require("../db");
const router = express.Router();
const { authenticate } = require('../middleware');

// @route   GET /cart/
// @desc    Get my cart
// @access  Private
// @status  DONE
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM cart where user_id = $1;';
        let result = await pool.query(query, [req.user.id]);

        if (result.rowCount === 0) {
            // Cart does not exist
            return res.json('No cart found.');
        }
    
        const cart = result.rows;

        console.log(cart);
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
});

// @route   POST /cart
// @desc    Create cart
// @access  Private
// @status  DONE
router.post('/', async (req, res) => {
    try {
        const { user_id, cart_total } = req.body;

        // Check for existing cart
        const existingCartQuery = await pool.query('SELECT * FROM cart where user_id = $1;', [user_id])
        const existingCart = existingCartQuery.rows[0];

        if(existingCart) {
            res.json(existingCart);
        } else {
            // Create the cart in the database
            const query = 'INSERT INTO cart (user_id, cart_total) VALUES ($1, $2)';
            const result = await pool.query(query, [user_id, cart_total]);
    
            res.json('Cart created successfully.');
        }

    } catch (error) {
        console.error(error);
        res.json({ error: 'Error creating cart.' });
    }
});

// @route   DELETE /cart/:id
// @desc    Delete product
// @access  Private
// @status  DONE
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = "DELETE FROM cart WHERE id = $1"
        const result = await pool.query(query, [id]);
        res.json("Deleted cart successfully");
    } catch (error) {
        console.error(error);
        
    }
});



// Cart Item //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// @route   GET /cart/items
// @desc    Get cart items for  your cart
// @access  Private
// @status  DONE
router.get('/items', async (req, res) => {
    try {
        const { cart_id } = req.body;
        const query = 'SELECT * FROM cart_items where cart_id = $1;';
        let result = await pool.query(query, [cart_id]);

        if (result.rowCount === 0) {
            return res.json('No cart items.');
        }
    
        const myCartItems = result.rows;

        res.json(myCartItems);
    } catch (error) {
        console.error(error);
    }
});

// @route   POST /cart/item
// @desc    Create a new cart item
// @access  Private
// @status  DONE
router.post('/item', async (req, res) => {
    try {
        const { cart_id, product_id, product_quantity, product_price } = req.body;

        // Check for if product is already in cart
        const existingItemQuery = await pool.query('SELECT * FROM cart_items where product_id = $1;', [product_id]);
        const existingItem = existingItemQuery.rows[0];
        existingItem && console.log("Item exists in cart: ", existingItem);
        
        if(existingItem) {
            // Update quantity
            await pool.query("UPDATE cart_items SET product_quantity = $1 WHERE product_id = $2", [existingItem.product_quantity + product_quantity, product_id]);
            res.json('Item quantity updated.');
        } else {
            // Create the cart in the database
            const query = 'INSERT INTO cart_items (cart_id, product_id, product_quantity, product_price) VALUES ($1, $2, $3, $4)';
            await pool.query(query, [cart_id, product_id, product_quantity, product_price]);
            res.json('Item successfully added to cart.');
        }

    } catch (error) {
        console.error(error);
        res.json({ error: 'Error adding item to cart.' });
    }
});
// @route   PUT /cart/item
// @desc    Update cart item quantity
// @access  Private
// @status  DONE
router.put('/item', async (req, res) => {
    try {
        const { cart_id, product_id, product_quantity, increase_quantity } = req.body; // increase_quantity is a boolean  where false means decrease quantity

        // Check for if product is already in cart
        const existingItemQuery = await pool.query('SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2;', [product_id, cart_id]);
        const existingItem = existingItemQuery.rows[0];
    
        // Update quantity
        const quantity_change = increase_quantity ? existingItem.product_quantity + product_quantity : existingItem.product_quantity - product_quantity; 
        await pool.query("UPDATE cart_items SET product_quantity = $1 WHERE product_id = $2", [quantity_change, product_id]);
        res.json('Item quantity updated.');

    } catch (error) {
        console.error(error);
        res.json({ error: 'Error creating cart.' });
    }
});
// @route   DELETE /cart/item
// @desc    Delete product
// @access  Private
// @status  IN PROGRESS
router.delete('/item', async (req, res) => {
    try {
        const { cart_id, product_id } = req.body;
        const query = "DELETE FROM cart_items WHERE product_id = $1 AND cart_id = $2;";
        await pool.query(query, [product_id, cart_id]);
        res.json("Deleted cart successfully");
    } catch (error) {
        console.error(error);
        res.json({ error: "Error deleting item." });
        
    }
});


module.exports = router;
