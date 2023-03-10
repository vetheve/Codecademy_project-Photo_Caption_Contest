
// Import express photoRouter
const photoRouter = require('express').Router();

// Import photoController
const photoController = require('../controllers/photoController.js');

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
photoRouter.use(bodyParser.json());

// Export balancephotoRouter for use in other modules
module.exports = photoRouter;

// Endpoint to handle requests
photoRouter.get('/', photoController.getAllPhotos);
//photoRouter.post('/', photoController.uploadNewPhoto);
photoRouter.get('/uuid/:uuid', photoController.getPhotoById);
//photoRouter.put('/uuid/:uuid', photoController.updatePhoto);
photoRouter.delete('/uuid/:uuid', photoController.deletePhoto);