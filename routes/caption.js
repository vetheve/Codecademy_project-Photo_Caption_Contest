// Import express captionRouter
const captionRouter = require('express').Router();

// Import captionController
const captionController = require('../controllers/captionController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
captionRouter.use(bodyParser.json());

// Import middlewares
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const cache = require('../middlewares/cache.js');

// Export balancecaptionRouter for use in other modules
module.exports = captionRouter;

// Endpoint to handle requests
captionRouter.get('/', cache(60), authentication, authorization(['user', 'admin']), captionController.getAllCaptions);
captionRouter.post('/', authentication, authorization(['user', 'admin']), captionController.uploadNewCaption);
captionRouter.get('/uuid/:uuid', cache(60), authentication, authorization(['user', 'admin']), captionController.getCaptionById);
captionRouter.put('/uuid/:uuid', authentication, authorization(['user', 'admin']), captionController.updateCaption);
