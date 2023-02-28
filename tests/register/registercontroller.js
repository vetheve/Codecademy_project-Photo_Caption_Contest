// Import necessary libraries and dependencies
const test = require('ava'); // Test runner library
const sinon = require('sinon'); // Test spies, stubs, and mocks library
const jwt = require('jsonwebtoken'); // Library to generate and verify JSON Web Tokens
const { 
    User 
} = require('../../models/index.js'); // User model from the application

// Import the function to be tested
const {
    registerNewUser
} = require('../../controllers/authcontroller.js');

// Import the secret key for the JSON web token from the authcontroller module
const secret = 'testsecret';

// Mock data for the request and response objects
const req = {
    body: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
    }
};

const res = {
    status: sinon.stub().returns({
        json: sinon.spy()
    })
};

// Mock User model's create method
User.create = sinon.stub().returns({
    id: 1
});

// Mock JWT's sign method
jwt.sign = sinon.stub().returns({
    json: sinon.spy()
});

// Test Case 1: Test that registerNewUser creates a new user in the database and returns a JWT token
test('1. registerNewUser creates a new user in the database and returns a JWT token', async (t) => {
    // Call the function with the mock request and response objects
    await registerNewUser(req, res);

    // Assert that User.create was called with the correct parameters
    t.deepEqual(User.create.getCall(0).args[0], {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
    });

    // Print the object in the console
    t.log(User.create.getCall(0).args[0]);
    t.log(jwt.sign.getCall(0).args[0]);

    // Assert that JWT.sign was called with the correct parameters
    t.deepEqual(jwt.sign.getCall(0).args[0], {
        id: 1
    });
    t.is(jwt.sign.getCall(0).args[1], secret);
    t.log(jwt.sign.getCall(0).args[1]);

    // Assert that the response was sent with the correct status code and token
    t.is(res.status.getCall(0).args[0], 201);
    t.truthy(res.status().json.getCall(0).args[0].token);
});

// Test Case 2: Test that registerNewUser returns an error message if an error occurs during the registration process
test('2. registerNewUser returns an error message if an error occurs during the registration process', async (t) => {
    // Mock User.create to throw an error
    User.create = sinon.stub().throws(new Error('Database error'));

    // Call the function with the mock request and response objects
    await registerNewUser(req, res);

    // Print the object in the console
    t.log(res.status.getCall(0));

    // Assert that the response was sent with the correct status code and error message
    t.is(res.status.getCall(0).args[0], 400);
    t.deepEqual(res.status().json.getCall(0).args[0], {
        error: 'Database error'
    });
});