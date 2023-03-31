
// Import express photoRouter
const photoRouter = require('express').Router();

// Import photoController
const photoController = require('../controllers/photoController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
photoRouter.use(bodyParser.json());

// Import middlewares
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const cache = require('../middlewares/cache.js');

// Export balancephotoRouter for use in other modules
module.exports = photoRouter;

// Endpoint to handle requests
photoRouter.get('/', cache(60), authentication, authorization(['user', 'admin']), photoController.getAllPhotos);
photoRouter.post('/', authentication, authorization(['user', 'admin']), photoController.uploadNewPhoto);
photoRouter.get('/uuid/:uuid', cache(60), authentication, authorization(['user', 'admin']), photoController.getPhotoById);
photoRouter.put('/uuid/:uuid', authentication, authorization(['user', 'admin']), photoController.updatePhoto);
photoRouter.delete('/uuid/:uuid', authentication, authorization(['admin']), photoController.deletePhoto);