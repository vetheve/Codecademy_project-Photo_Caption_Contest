const test = require("ava"); // Importing the AVA test library
const request = require("supertest"); // Importing the supertest library for making HTTP requests
const apiRouter = require('../../routes/api.js'); // Importing the api router file for the all the routers
const express = require('express'); // Importing express

// Create an instance of the express application
const app = express();

// Use the apiRouter with the '/api' route
app.use('/', apiRouter);

// Use dotenv to access environment variables defined in a '.env' file
require('dotenv').config()

test('loginUser function should allow th user to connect and return a token', async t => {
    // Creating a request object
    const logUser = {
        email: 'testuser@example.com',
        password: 'password',
    };

    // Making a POST request to the '/login' route 
    const res = await request(app).post('/login').send(logUser);

    // Asserting that the status code of the response is 201
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
});

