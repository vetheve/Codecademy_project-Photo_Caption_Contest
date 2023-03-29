// Import express voteRouter
const voteRouter = require('express').Router();

// Import voteController
const voteController = require('../controllers/voteController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
voteRouter.use(bodyParser.json());

// Export voteRouter for use in other modules
module.exports = voteRouter;

voteRouter.post('/', voteController.createVote);

