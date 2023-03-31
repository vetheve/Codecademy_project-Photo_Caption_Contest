
// Import express userRouter
const userRouter = require('express').Router();

// Import userController
const userController = require('../controllers/userController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
userRouter.use(bodyParser.json());

// Import middlewares
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const cache = require('../middlewares/cache.js');

// Export userRouter for use in other modules
module.exports = userRouter;

// Endpoint to handle requests
userRouter.get('/', cache(60), authentication, authorization(['admin']), userController.getAllUsers);
userRouter.get('/uuid/:uuid', cache(60), authentication, authorization(['user', 'admin']), userController.getUserById);
userRouter.put('/uuid/:uuid', authentication, authorization(['user', 'admin']), userController.updateUser);
userRouter.delete('/uuid/:uuid', authentication, authorization(['admin']), userController.deleteUser);