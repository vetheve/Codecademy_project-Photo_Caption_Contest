const express = require('express');
const router = express.Router();

// Import the controllers
const authController = require('../controllers/authController.js');
//const usersController = require('../controllers/usersController.js');
//const photosController = require('../controllers/photosController.js');
//const captionsController = require('../controllers/captionsController.js');
//const votesController = require('../controllers/votes');

// Import the auth middleware
//const auth = require('../middleware/auth');

// Define the routes
router.post('/auth/register', authController.registerNewUser);
/*
router.post('/auth/login', authController.loginUser);

router.get('/users', auth, usersController.getAllUsers);
router.get('/users/:id', auth, usersController.getUserById);
router.put('/users/:id', auth, usersController.updateUser);
router.delete('/users/:id', auth, usersController.deleteUser);

router.get('/photos', auth, photosController.getAllPhotos);
router.post('/photos', auth, photosController.uploadNewPhoto);
router.get('/photos/:id', auth, photosController.getPhotoById);
router.put('/photos/:id', auth, photosController.updatePhoto);
router.delete('/photos/:id', auth, photosController.deletePhoto);

router.get('/captions', auth, captionsController.getAllCaptions);
router.post('/captions', auth, captionsController.createNewCaption);
router.get('/captions/:id', auth, captionsController.getCaptionById);
router.put('/captions/:id', auth, captionsController.updateCaption);
router.delete('/captions/:id', auth, captionsController.deleteCaption);
*/

// Export the router
module.exports = router;


