// Import express voteRouter
const voteRouter = require('express').Router();

// Import voteController
const voteController = require('../controllers/voteController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
voteRouter.use(bodyParser.json());

// Import middlewares
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const cache = require('../middlewares/cache.js');

// Export voteRouter for use in other modules
module.exports = voteRouter;

voteRouter.post('/', authentication, authorization(['user', 'admin']), voteController.createVote);

