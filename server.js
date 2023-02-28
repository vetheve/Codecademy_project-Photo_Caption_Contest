require('dotenv').config(); // load environment variables from .env file

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

