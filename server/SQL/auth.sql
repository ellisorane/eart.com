-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(100) UNIQUE NOT NULL,
  user_password VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Register a new user
INSERT INTO users (user_name, email, user_password)
VALUES ('john_doe', 'john@example.com', 'password');