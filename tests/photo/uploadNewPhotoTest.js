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

test('uploadNewPhoto function should upload a new photo', async t => {
    // Creating a request object
    const newPhoto = {
        url: 'https://fr.web.img4.acsta.net/r_1920_1080/pictures/18/06/19/16/34/5220228.jpg',
        user_id: '96738de2-06b1-407b-bd4d-673b1839b5ce',
    };

    // Making a POST request to the '/photos' route 
    const res = await request(app).post('/photos').send(newPhoto);

    // Asserting that the status code of the response is 201
    t.is(res.status, 201);

    // Print the object in the console
    t.log(res.body)
});