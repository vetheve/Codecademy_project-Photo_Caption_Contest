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

// Function to obtain an authentication token
async function getAuthToken(role = "user") {
    const credentials =
      role === "admin"
        ? { email: "johndoe@example.com", password: "password123" }
        : { email: "janedoe@example.com", password: "password456" };
  
    const res = await request(app)
      .post("/login")
      .send(credentials);
  
    return res.body.token;
  }
  
  test("1. getAllUsers should return 403 if the user is not an admin", async (t) => {
    const userToken = await getAuthToken("user");
  
    const res = await request(app)
      .get("/users")
      .set("authorization", userToken);
  
    t.is(res.status, 403);
  });
  
  test("2. getAllUsers should return all users if the user is an admin", async (t) => {
    const adminToken = await getAuthToken("admin");
  
    const res = await request(app)
      .get("/users")
      .set("authorization", adminToken);
  
    t.is(res.status, 200);
  
    // Assuming there are at least 2 users in the database
    t.true(res.body.length >= 2);
  });
  
  test("3. getAllUsers should return 401 if no token is provided", async (t) => {
    const res = await request(app).get("/users");
  
    t.is(res.status, 401);
  });
  
  test("4. Cache middleware should store response for subsequent requests", async (t) => {
    const adminToken = await getAuthToken("admin");
  
    // First request to populate cache
    await request(app)
      .get("/users")
      .set("authorization", adminToken);
  
    // Starting the timer
    const start = Date.now();
  
    // Second request to check the cache
    const res = await request(app)
      .get("/users")
      .set("authorization", adminToken);
  
    // Ending the timer
    const end = Date.now();
  
    // The response should be faster due to cache (this is an approximation and might not always hold true)
    t.true(end - start < 100);
  
    t.is(res.status, 200);
  });


/*
test('getAllUsers function should retrieve all users', async t => {

    // Making a GET request to the '/users' route 
    const res = await request(app).get('/users');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
});
*/