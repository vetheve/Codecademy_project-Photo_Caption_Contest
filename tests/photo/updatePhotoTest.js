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

test('updatePhoto function should retrieve a Photo by uuid and update the url', async t => {
    
    const photoId = "eca59d1f-ac28-43f2-92b0-17525a871baf";
    
    const updatedPhoto = {
        url: 'https://shorturl.gg/yTwD'           
    };

    // Making a GET request to the '/Photos' route 
    const res = await request(app).put(`/photos/uuid/${photoId}`).send(updatedPhoto);

    // Asserting that the status code of the response is 200
    t.is(res.status, 204);
    
    // Displaying the response body using console.dir to show the entire contents of the objects
    console.dir(res.body, { depth: null });
});