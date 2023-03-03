// Import express Router
const loginRouter = require('express').Router();

// Import authController
const authController = require('../controllers/authController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
loginRouter.use(bodyParser.json());

// Export loginRouter for use in other modules
module.exports = loginRouter;

// Endpoint to handle requests to login
loginRouter.post('/', authController.loginUser);