CREATE DATABASE eart_db; -- DONE

-- Create the users table -- DONE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(100) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Register a new user
INSERT INTO users (user_name, email, user_password)
VALUES ('john_doe', 'john@example.com', 'password');


-- Create the Products table -- DONE
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL UNIQUE,
  product_description TEXT NOT NULL,
  product_price NUMERIC(10, 2) NOT NULL,
  product_image_name VARCHAR(255) NOT NULL,
  product_image_url VARCHAR(255) NOT NULL,
  product_image_url_creation_date TIMESTAMPTZ DEFAULT NOW()
);

-- Create the Cart table -- DONE
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
  cart_total NUMERIC(10, 2) NOT NULL
);

-- Create the Cart Items table -- DONE
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart(id),
  product_id INTEGER REFERENCES products(id),
  product_quantity INTEGER,
  product_price NUMERIC(10, 2)
);

-- Create the Orders table -- 
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id),
  status VARCHAR(255),
  total_amount NUMERIC(10, 2),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Order Items table -- 
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES Orders(id),
  product_id INTEGER REFERENCES Products(id),
  quantity INTEGER,
  price NUMERIC(10, 2)
);


