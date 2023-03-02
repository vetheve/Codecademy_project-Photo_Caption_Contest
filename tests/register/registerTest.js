const test = require('ava');
const request = require('supertest');
const { User } = require('../../models/index.js');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Create an instance of the express application
const app = express();
const router = require('../../routes/index.js'); 

// Use the router with the '/index' route
app.use('/index', router);

require('dotenv').config()

test('foo', t => {
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_DIALECT);
    console.log(process.env.JWT_SECRET);
    t.pass();
});


// Test for registering a new user
test('register new user', async (t) => {
  t.plan(3);

  const res = await request(app)
    .post('/auth/register')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    })
    .expect(201);

  const token = res.body.token;

  // Verify that the token is valid
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      t.fail();
    } else {
      t.is(decoded.id, 1); // assuming that the first user has an ID of 1
      t.pass();
    }
  });

  // Verify that the user was added to the database
  const user = await User.findOne({ where: { username: 'testuser' } });
  t.is(user.email, 'testuser@example.com');
});
