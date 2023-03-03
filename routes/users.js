
// Import express userRouter
const userRouter = require('express').userRouter();

// Import authController
const authController = require('../controllers/authController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
userRouter.use(bodyParser.json());

// Export balanceuserRouter for use in other modules
module.exports = userRouter;

// Endpoint to handle requests for the total budget balance
userRouter.post('/', authController.registerNewUser);

userRouter.get('/users', auth, usersController.getAllUsers);
userRouter.get('/users/:id', auth, usersController.getUserById);
userRouter.put('/users/:id', auth, usersController.updateUser);
userRouter.delete('/users/:id', auth, usersController.deleteUser);
