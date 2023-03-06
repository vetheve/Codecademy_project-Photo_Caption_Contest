
// Import express userRouter
const userRouter = require('express').Router();

// Import userController
const userController = require('../controllers/userController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
userRouter.use(bodyParser.json());

// Export balanceuserRouter for use in other modules
module.exports = userRouter;

// Endpoint to handle requests to getAllUsers
userRouter.get('/', userController.getAllUsers);

// Endpoint to handle requests to getUserByID
userRouter.get('/uuid/:uuid', userController.getUserById);