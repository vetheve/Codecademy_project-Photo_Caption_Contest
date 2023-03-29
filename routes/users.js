
// Import express userRouter
const userRouter = require('express').Router();

// Import userController
const userController = require('../controllers/userController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
userRouter.use(bodyParser.json());

// Export userRouter for use in other modules
module.exports = userRouter;

// Endpoint to handle requests
userRouter.get('/', userController.getAllUsers);
userRouter.get('/uuid/:uuid', userController.getUserById);
userRouter.put('/uuid/:uuid', userController.updateUser);
userRouter.delete('/uuid/:uuid', userController.deleteUser);