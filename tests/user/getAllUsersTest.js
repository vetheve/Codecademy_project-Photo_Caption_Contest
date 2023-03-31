const test = require("ava"); // Importing the AVA test library
const request = require("supertest"); // Importing the supertest library for making HTTP requests
const apiRouter = require('../../routes/api.js'); // Importing the api router file for the all the routers
const express = require('express'); // Importing express

const {
    User
} = require('../../models/index.js');

// Importing the JSON web token package
const jwt = require('jsonwebtoken');

// Getting the secret key for the JSON web token from the environment variables
const authConfig = require('../../config/authConfig');

// Create an instance of the express application
const app = express();

// Use the apiRouter with the '/api' route
app.use('/', apiRouter);

// Use dotenv to access environment variables defined in a '.env' file
require('dotenv').config()

// Defining a custom method on the User model to generate a JSON web token for the user
User.prototype.generateToken = function() {
    // Creating a JSON web token using the user's ID and the secret key
    return jwt.sign({
        user_uuid: this.uuid
    }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
    });
}

// Test for admin role
test('getAllUsers function should retrieve all users with admin role', async t => {

    // Login as an admin user to get the access token
    const adminUser = await User.findOne({ where: { email: 'johndoe@example.com' }});
    const token = await adminUser.generateToken();

    // Making a GET request to the '/users' route with authentication and authorization middleware
    const res = await request(app).get('/users').set('Authorization', token);

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
});

// Test for user role
test('getAllUsers function should not retrieve all users with user role', async t => {

    // Login as a user to get the access token
    const user = await User.findOne({ where: { email: 'janedoe@example.com' }});
    const token = await user.generateToken();

    // Making a GET request to the '/users' route with authentication and authorization middleware
    const res = await request(app).get('/users').set('Authorization', token);

    // Asserting that the status code of the response is 403 since the user is not authorized to access this resource
    t.is(res.status, 403);

    // Print the object in the console
    t.log(res.body)
});
/*
// Function to obtain an authentication token
async function getAuthToken(role = "user") {
    const credentials =
      role === "admin"
        ? { email: "johndoe@example.com", password: "password123" }
        : { email: "janedoe@example.com", password: "password456" };

    const res = await request(app)
      .post("/login")
      .send(credentials);

    return res.body.accessToken;
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
    t.true(res.body.users.length >= 2); // Updated this line to access 'users' property from the response body
});
  
test("3. getAllUsers should return 401 if no token is provided", async (t) => {
    const res = await request(app).get("/users");
  
    t.is(res.status, 401);
});
  
test("4. Cache middleware should store response for subsequent requests", async (t) => {
    const adminToken = await getAuthToken("admin");
  
    await request(app)
      .get("/users")
      .set("authorization", adminToken);
  
    const start = Date.now();
  
    const res = await request(app)
      .get("/users")
      .set("authorization", adminToken);
  
    const end = Date.now();
  
    t.true(end - start < 100);
  
    t.is(res.status, 200);
});
*/

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