const { Vote, User } = require('./models');
/*
const exemple = User.create({
  username: 'Alcalin789',
  email: 'blow@mind.com',
  password: 'BlowMyMind974' ,
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});
*/
const exemple = Vote.create({
  value: 5,
  user_id: '30c29e0f-0ad3-4fe4-bced-deaebcd2ff83'
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});

console.log(exemple)
