const express = require('express');
const db = require('./models');
const jwt = require('jsonwebtoken');

// Create an instance of the express application
const app = express();
const router = require('../../routes/index.js'); 

// Use the router with the '/index' route
app.use('/index', router);

// Import the environment variables
require('dotenv').config();

module.exports = app;

const dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
};

const jwtConfig = {
  secret: process.env.JWT_SECRET
};

// Set up middleware to parse JSON request bodies
app.use(express.json());

// Set up routes
app.use('/', routes);

// Connect to the database and start the server
db.sequelize.sync().then(() => {
  console.log('Connected to the database');
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});

