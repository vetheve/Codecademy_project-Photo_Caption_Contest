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

test('updateCaption function should retrieve a Caption by uuid and update the url', async t => {
    
    const captionId = "d2cfff4b-4e74-4294-bdfc-d6230506c4b3";
    
    const updatedCaption = {
        text: 'Pas de sagesse sans grand de folie !'           
    };

    // Making a GET request to the '/captions' route 
    const res = await request(app).put(`/captions/uuid/${captionId}`).send(updatedCaption);

    // Asserting that the status code of the response is 200
    t.is(res.status, 204);
    
    // Displaying the response body using console.dir to show the entire contents of the objects
    console.dir(res.body, { depth: null });
});