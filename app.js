const express = require('express');
const db = require('./models');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();

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
app.use('/auth', authRoutes);

// Connect to the database and start the server
db.sequelize.sync().then(() => {
  console.log('Connected to the database');
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});

