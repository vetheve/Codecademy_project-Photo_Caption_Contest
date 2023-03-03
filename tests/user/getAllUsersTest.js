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

test('getAllUsers function should retrieve all users', async t => {

    // Making a GET request to the '/users' route 
    const res = await request(app).get('/users');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
});