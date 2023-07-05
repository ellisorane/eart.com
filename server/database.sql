-- Add the following commands to the psql terminal
 
CREATE DATABASE eArtDB;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description varchar(255)
);