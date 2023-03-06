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

test('getUserById function should retrieve a user by uudi', async t => {

    const userId = '634a114a-9942-46f9-9f95-915d23c7d8d3'

    // Making a GET request to the '/users' route 
    const res = await request(app).get('/users/uudi/${userId}');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
});