// Import express Router
const registerRouter = require('express').Router();

// Import authController
const authController = require('../controllers/authController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
registerRouter.use(bodyParser.json());

// Export registerRouter for use in other modules
module.exports = registerRouter;

// Endpoint to handle requests to register new user
registerRouter.post('/', authController.registerNewUser);
