
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

test('deletetUser function should delete a user by uuid', async t => {

    const userId = "1d6bc82a-d102-4eca-bd09-5adca5c0ad5f";

    // Making a DELETE request to the '/users' route 
    const res = await request(app).delete(`/users/uuid/${userId}`);

    // Asserting that the status code of the response is 204
    t.is(res.status, 204);

    // Print the object in the console
    t.log(res.body)
});

