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

### `/auth` 
- __POST__ `/auth/register`: registerNewUser
- __POST__ `/auth/login`: loginUser

  
### `/users` (CRUD)

- __GET__ `/users`: getAllUsers
- __GET__ `/users/user_id`: getUserById
- __PUT__ `/users/user_id`: updateUser
- __DELETE__ `/users/user_id`: deleteUser

### `/photos` (CRUD)

- __GET__ `/photos`: getAllPhotos
- __POST__ `/photos`: uploadNewPhoto
- __GET__ `/photos/id`: getPhotoById
- __PUT__ `/photos/id`: updatePhoto
- __DELETE__ `/photos/id`: deletePhoto

### `/captions` (CRUD)

- __GET__ `/captions`: getAllCaptions
- __POST__ `/captions`: createNewCaption
- __GET__ `/captions/id`: getCaptionById
- __PUT__ `/captions/id`: updateCaption
- __DELETE__ `/captions/id`: deleteCaption

### `/votes` (CR)

- __GET__ `/votes`: getAllVotes
- __POST__ `/votes/photos/id`: newVotes
- __GET__ `/votes/photos/id`: getVotesByPhoto

ressource compte d'utilisateur 
entité/action/ressource
créer:->action requête
identité:->ressource 'instance de ces modèles

utilisateur anonyme se créer un compte accèder au contenu public
utilisateur conecté authetifier et supprimer et modifier ce qui lui appartient
utilisateur admin capable de tout faire role base access control
