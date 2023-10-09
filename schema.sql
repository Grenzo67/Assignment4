CREATE TABLE users (
    id int PRIMARY KEY NOT NULL,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(40) NOT NULL,
    age int NOT NULL);
    
CREATE TABLE Riddles (
    id SERIAL PRIMARY KEY, 
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL
);