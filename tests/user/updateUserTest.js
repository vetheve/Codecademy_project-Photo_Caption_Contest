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


test('1. updateUser function should retrieve a user by uuid and update the password', async t => {
    
    const userId = "4a0e204e-6fcd-4646-b005-3eb5bc41c8fb";
    
    const updatedUser = {
        password: 'outlander-Skyrim-Simpson'           
    };

    // Making a GET request to the '/users' route 
    const res = await request(app).put(`/users/uuid/${userId}`).send(updatedUser);

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Displaying the response body using console.dir to show the entire contents of the objects
    console.dir(res.body, { depth: null });
});

test('2. updateUser function should retrieve a user by uuid and update the username', async t => {
    
    const userId = "4a0e204e-6fcd-4646-b005-3eb5bc41c8fb";
    
    const updatedUser = {
        username: 'POPcorne25M'           
    };

    // Making a GET request to the '/users' route 
    const res = await request(app).put(`/users/uuid/${userId}`).send(updatedUser);

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Displaying the response body using console.dir to show the entire contents of the objects
    console.dir(res.body, { depth: null });
});
