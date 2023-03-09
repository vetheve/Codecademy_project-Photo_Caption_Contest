// Import the express module
const express = require('express');

// Create an instance of the express Router
const apiRouter = express.Router();

// Import all routers
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const userRouter = require('./users.js');
const photoRouter = require('./photo.js');
//const captionRouter = require('./caption.js');
//const voteRouter = require('./vote.js');

// Use the imported routers
apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/photo', photoRouter);
//apiRouter.use('/caption', captionRouter);
//apiRouter.use('/vote', voteRouter);

// Export the apiRouter
module.exports = apiRouter