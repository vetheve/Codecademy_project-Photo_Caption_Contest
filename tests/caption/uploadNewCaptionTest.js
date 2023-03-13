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

test('uploadNewCaption function should upload a new Caption', async t => {
    // Creating a request object
    const newCaption = {
        text: 'Parce que sinon ils tombent dans le bateau !',
        user_id: '96738de2-06b1-407b-bd4d-673b1839b5ce',
        photo_id: 'fedd7197-0c15-4ee4-8aa3-0ed474b80fcb'
    };


    // Making a POST request to the '/Captions' route 
    const res = await request(app).post('/captions').send(newCaption);

    // Asserting that the status code of the response is 201
    t.is(res.status, 201);

    // Print the object in the console
    t.log(res.body)
});