-- Add the following commands to the psql terminal
 
CREATE DATABASE eart_db;

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(100) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Register a new user
INSERT INTO users (user_name, email, user_password)
VALUES ('john_doe', 'john@example.com', 'password');


-- Create the Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
);


-- Create the Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id),
  status VARCHAR(255),
  total_amount NUMERIC(10, 2),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Order Items table
CREATE TABLE Order_Items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES Orders(id),
  product_id INTEGER REFERENCES Products(id),
  quantity INTEGER,
  price NUMERIC(10, 2)
);

-- Create the Cart table
CREATE TABLE Cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id)
);

-- Create the Cart Items table
CREATE TABLE Cart_Items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES Cart(id),
  product_id INTEGER REFERENCES Products(id),
  quantity INTEGER,
  price NUMERIC(10, 2)
);
