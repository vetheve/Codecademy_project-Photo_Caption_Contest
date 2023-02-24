const { Vote, User } = require('./models');

const exemple = Vote.create({
  username: 'Alcalin789',
  email: 'blow@mind.com',
  password: 'BlowMyMind974' ,
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});

/*
const exemple = Vote.create({
  value: 5,
  user_id: '3f522d9f-d2c8-4e5d-8ca8-2774831f9a8c'
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});
*/

console.log(exemple)
