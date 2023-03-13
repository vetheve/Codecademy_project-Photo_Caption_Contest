// Import express captionRouter
const captionRouter = require('express').Router();

// Import captionController
const captionController = require('../controllers/captionController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
captionRouter.use(bodyParser.json());

// Export balancecaptionRouter for use in other modules
module.exports = captionRouter;

// Endpoint to handle requests
captionRouter.get('/', captionController.getAllCaptions);
//captionRouter.post('/', captionController.uploadNewCaption);
captionRouter.get('/uuid/:uuid', captionController.getCaptionById);
//captionRouter.put('/uuid/:uuid', captionController.updateCaption);
//captionRouter.delete('/uuid/:uuid', captionController.deleteCaption);