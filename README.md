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

## __POST__ `/auth/register`: registerNewUser

                    +-----------+                      +---------------+
                    |           |                      |               |
                    |   Client  |                      |    Server     |
                    |           |                      |               |
                    +-----+-----+                      +-------+-------+
                          |                                    |
                          | 1. Send registration data          |
                          |----------------------------------->|
                          |                                    |
                          | 2. Validate user's input           |
                          |<-----------------------------------|
                          |                                    |
                          | 3. Hash user's password            |
                          |<-----------------------------------|
                          |                                    |
                          | 4. Create new user in the database |
                          |----------------------------------->|
                          |                                    |
                          | 5. Generate JWT for user           |
                          |<-----------------------------------|
                          |                                    |
                          | 6. Send JWT to client in data      |
                          |<-----------------------------------|
                          |                                    |
                          | 7. Save JWT in client storage      |
                          |                                    |
                          |                                    |
                          +------------------------------------+
| CLIENT-SIDE | SERVER-SIDE |
|-------------|-------------|
| User enters registration details(name, email, password)|
| Client sends registration request with user's details | Server receives registration request |
| | Server validates the user's input data |
| | Server uses bcrypt to hash the user's password |
| | Server creates a new user account in the database with the user's details and hashed password |
| | Server generates a JWT to authenticate the user's session |
| Server receives JWT back in response data | Client saves JWT in local storage or cookie |
| | Server authorizes user's access to protected routes using the JWT |
| User is now registered and authenticated on the server | |

### Details

1. The client sends a GET request to the server's /auth/register endpoint with the user's name, email, and password included in the request data.
2. The server (implemented using Node.js and PostgreSQL) receives the request and validates the user's input, making sure the email address is valid and the password meets the required complexity and length.
3. The server then uses the bcrypt library to hash the user's password before storing it in the database.
4. The server creates a new user account in the database, using the provided name, email, and hashed password.
5. After successfully creating the new user account, the server generates a JSON Web Token (JWT) using the jsonwebtoken library to authenticate the user's session.
6. The server sends the JWT back to the client in the response data, allowing the user to access protected routes on the server.
7. The client saves the JWT in local storage or a cookie for future requests to authenticated endpoints.
8. The user is now registered and authenticated on the server, and can begin using the app's features and services.


## __POST__ `/auth/login`: loginUser

                    +-----------+                      +---------------+
                    |           |                      |               |
                    |   Client  |                      |    Server     |
                    |           |                      |               |
                    +-----+-----+                      +-------+-------+
                          |                                    |
                          | 1. Send login data                 |
                          |----------------------------------->|
                          |                                    |
                          | 2. Retrieve user's data            |
                          |<-----------------------------------|
                          |                                    |
                          | 3. Compare password with hash      |
                          |<-----------------------------------|
                          |                                    |
                          | 4. Generate JWT for user           |
                          |<-----------------------------------|
                          |                                    |
                          | 5. Send JWT to client in data      |
                          |<-----------------------------------|
                          |                                    |
                          | 6. Save JWT in client storage      |
                          |                                    |
                          |                                    |
                          +------------------------------------+
                          
| CLIENT-SIDE | SERVER-SIDE |
|-------------|-------------|
| User enters login details | |
| Client sends login request with user's email and password | Server receives login request |
| | Server retrieves user's account data from the database |
| | Server compares user's input password with stored hashed password |
| | If passwords match, Server generates JWT |
| Client receives JWT back in response data | |
| | Server authorizes user's access to protected routes using the JWT |


### Details
1. The user enters their login credentials (usually email and password) on the client-side (front-end) of the application.
2. The client-side sends a GET request to the server's /auth/login endpoint with the user's email and password included in the request data.
3. The server (implemented using Node.js and PostgreSQL) receives the request and retrieves the user's account data from the database using the provided email address.
4. The server uses the bcrypt library to compare the user's input password with the stored hashed password in the database. If they match, the server proceeds to the next step.
5.a. If the password is correct, the server generates a JSON Web Token (JWT) using the jsonwebtoken library to authenticate the user's session.
  1. The server sends the JWT back to the client in the response data, allowing the user to access protected routes on the server.
  1. The client saves the JWT in local storage or a cookie for future requests to authenticated endpoints.
5.b. If the user's login credentials are incorrect, the server sends an error response to the client-side, which can then display an error message to the user.
  1. The user is now authenticated on the server and can access protected routes. Subsequent requests to protected routes will include the JWT in the request headers, which the server can use to verify the user's identity and authorize their access.

## __GET__ `/photos`: getAllPhotos

````

+-----------+                                    +-----------+                                    +-----------+
|           |                                    |           |                                    |           |
|   Client  |                                    |  Server   |                                    |  Database |
|           |                                    |           |                                    |           |
+-----+-----+                                    +-----+-----+                                    +-----+-----+
      |                                                |                                                |
      |                                                |                                                |
      |                                                |                                                |
      | 1. Send a GET request with user_id and JWT     |                                                |
      |----------------------------------------------->|                                                |
      |                                                |                                                |
      |                                                |                                                |
      | 2. Authorize user's request                    | 2. Check role and authenticate                 |
      |<-----------------------------------------------|<-----------------------------------------------|
      |                                                |                                                |
      |                                                |                                                |
      | 4. Return a JSON response                      | 3. Fetche all photos from the database         |
      |<-----------------------------------------------|<-----------------------------------------------|
      |                                                |                                                |
      |                                                |                                                |
      | 5. Parse the JSON                              |                                                |
      |<-----------------------------------------------|                                                |
      |                                                |                                                |
      |                                                |                                                |
      | 6. Display photos                              |                                                |
      |<-----------------------------------------------|                                                |
      |                                                |                                                |
      |                                                |                                                |
      +------------------------------------------------+------------------------------------------------+

````

### Details
1. The client sends a GET request to the server's /photos endpoint with the user's ID and JSON Web Token (JWT) included in the request header.
2. The server (implemented using Node.js and PostgreSQL) receives the request and authenticates the user's session using the JWT. The server also checks the user's role to make sure they are authorized to access the requested resource (in this case, all photos).
3. If the user is authorized, the server fetches all photos from the database.
4. The server then returns a JSON response containing an array of all photos, including metadata such as the photo ID, file name, upload date, and any other relevant information.
5. The client receives the JSON response and parses it to extract the photo data.
6. The client then displays the photos to the user.

Note: make a separate step for authorization.

-----------------------------------------------------------
ressource compte d'utilisateur 
entité/action/ressource
créer:->action requête
identité:->ressource 'instance de ces modèles

utilisateur anonyme se créer un compte accèder au contenu public
utilisateur conecté authetifier et supprimer et modifier ce qui lui appartient
utilisateur admin capable de tout faire role base access control
