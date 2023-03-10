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


test('gePhotoById function should retrieve a user by uuid', async t => {
    const photoId = "84a2f365-1ef4-4321-81e4-c37471fb9507";

    // Making a GET request to the '/photos' route 
    const res = await request(app).get(`/photos/uuid/${photoId}`);

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Displaying the response body using console.dir to show the entire contents of the objects
    console.dir(res.body, { depth: null });
});