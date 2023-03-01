const express = require('express');
const db = require('./models');
const jwt = require('jsonwebtoken');

// Import the routes
const routes = require('./routes/index.js');

// Import the environment variables
require('dotenv').config();

const app = express();

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

