const { Vote } = require('./models');
/*const exemple = User.create({
  username: 'example',
  email: 'example@example.com',
  password: 'examplepassword'
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});
*/
const exemple4 = Vote.create({
    value: 5
  }).then((user) => {
    console.log(user);
  }).catch((error) => {
    console.error(error);
  });

console.log(exemple4)
