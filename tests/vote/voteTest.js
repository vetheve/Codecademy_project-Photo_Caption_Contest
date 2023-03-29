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


test('createVote function should create a new vote', async t => {

  // Creating a request object
  const newVote = {
    value: 4,
    photoId: "780f948a-2079-4270-b009-d86ee084b109",
    userId: "e2019b10-62ae-47b1-97b4-f2d000e6cf17"
  };

  // Making a POST request to the '/votes' route 
  const res = await request(app).post('/votes').send(newVote);

    // Asserting that the status code of the response is 201
    t.is(res.status, 201);

    // Print the object in the console
    t.log(res.body)
});

