# Codecademy project: Photo Caption Contest

**The "Photo Caption Contest" project is a component of the Codecademy Back-End Engineer course.**

>The project involves creating a backend for a photo caption contest platform. The server will host images and have endpoints for user authentication and authorization. Users will need to be signed in to create a caption, and a database schema using PostgreSQL and ORM sequelize will be created to store user and caption information. Endpoints will be tested using Postman, and a localized cache will be used to optimize performance. Swagger will be used to write the documentation, and the project will be deployed on Heroku.

## Project Objectives:
- Use Git version control
- Create documentation using the Swagger API
- Implement a database
- Integrate existing API endpoints with database layer
- Database implementation for transactions
- Deploy app using Heroku

## Prerequisites:
- Command line and file navigation
- Git and GitHub
- Javascript
- Node.js/Express
- Postman
- PostgreSQL
- Database relationships and configuration
- Sequelize
- Heroku

## Endpoints
### `/users` (CRUD)

- __GET__ `/users`: getAllUsers
- __POST__ `/users`: createNewUser
- __GET__ `/users/user_id/:user_id`: getUserById
- __PUT__ `/users/user_id/:user_id`: updateUser
- __DELETE__ `/users/user_id/:user_id`: deleteUser

### `/photos` (CRUD)

- __GET__ `/photos`: getAllPhotos
- __POST__ `/photos`: uploadNewPhoto
- __GET__ `/photos/id/:id`: getPhotoById
- __PUT__ `/photos/id/:id`: updatePhoto
- __DELETE__ `/photos/id/:id`: deletePhoto

### `/captions` (CRUD)

- __GET__ `/photos`: getAllCaptions
- __POST__ `/photos`: createNewCaption
- __GET__ `/photos/id/:id`: getCaptionById
- __PUT__ `/photos/id/:id`: updateCaption
- __DELETE__ `/photos/id/:id`: deleteCaption

### `/votes` (CR)

- __GET__ `/votes`: getAllVotes
- __POST__ `/votes`: newVotes
- __GET__ `/photos/id/:id/votes`: getVotesByPhoto
