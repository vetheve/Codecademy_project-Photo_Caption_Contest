# Photo Caption Contest

The "Photo Caption Contest" project is a part of the Codecademy Back-End Engineer course. This project aims to create a backend for a photo caption contest platform, which includes user authentication and authorization, image hosting, and interaction with a PostgreSQL database through the Sequelize ORM. The project will also feature API documentation using Swagger, testing with Postman, and deployment on Heroku.

## Table of Contents
- Project Objectives
- Prerequisites
- Endpoints
  - Auth
  - Users
  - Photos
  - Captions
  - Votes
- API Flow Examples
  - Register New User
  - Login User
  - Get All Photos

## Project Objectives
- Implement version control with Git
- Write API documentation using Swagger
- Integrate a PostgreSQL database
- Connect API endpoints with the database layer
- Handle transactions with the database
- Deploy the app on Heroku

## Prerequisites
- Command line and file navigation
- Git and GitHub
- JavaScript
- Node.js/Express
- Postman
- PostgreSQL
- Database relationships and configuration
- Sequelize
- Heroku

## Endpoints

### Auth
- POST /auth/register: registerNewUser
- POST /auth/login: loginUser

### Users
- GET /users: getAllUsers
- GET /users/user_id: getUserById
- PUT /users/user_id: updateUser
- DELETE /users/user_id: deleteUser

### Photos
- GET /photos: getAllPhotos
- POST /photos: uploadNewPhoto
- GET /photos/id: getPhotoById
- PUT /photos/id: updatePhoto
- DELETE /photos/id: deletePhoto

### Captions
- GET /captions: getAllCaptions
- POST /captions: createNewCaption
- GET /captions/id: getCaptionById
- PUT /captions/id: updateCaption
- DELETE /captions/id: deleteCaption

### Votes
- GET /votes: getAllVotes
- POST /votes/photos/id: newVotes
- GET /votes/photos/id: getVotesByPhoto

## API Flow Examples

### POST /auth/register: registerNewUser
1. User enters registration details (name, email, password) on the client-side
2. Client sends registration request with user's details to the server
3. Server validates user's input data, hashes the password, and creates a new user account in the database
4. Server generates a JWT to authenticate the user's session
5. Client receives JWT in response data and saves it in local storage or a cookie
6. Server authorizes user's access to protected routes using the JWT
7. User is now registered and authenticated on the server

### POST /auth/login: loginUser
1. User enters login details (email, password) on the client-side
2. Client sends login request with user's email and password to the server
3. Server retrieves user's account data from the database and compares the input password with the stored hashed password
4. If passwords match, the server generates a JWT
5. Client receives JWT in response data and saves it in local storage or a cookie
6. Server authorizes user's access to protected routes using the JWT
7. User is now authenticated on the server and can access protected routes

### GET /photos: getAllPhotos
1. Client sends a GET request to the server's /photos endpoint with the user's ID and JWT in the request header
2. Server receives the request, authenticates the user's session using the JWT, and checks the user's role to ensure authorization
3. If the user is authorized, the server fetches all photos from
3. If the user is authorized, the server fetches all photos from the database
4. Server returns a JSON response containing an array of all photos and their metadata
5. Client receives the JSON response, parses it, and extracts the photo data
6. Client displays the photos to the user

