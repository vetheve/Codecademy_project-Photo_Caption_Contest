const test = require('ava');
const request = require('supertest');
const app = require('../../app.js'); 
const { User } = require('../../models/index.js');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

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
