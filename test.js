const { Vote, User, Photo, Caption } = require('./models');

const user = User.create({
  username: 'Alcalin789',
  email: 'blow@mind.com',
  password: 'BlowMyMind974' ,
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});

console.log(user);

const photo = Photo.create({
  url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
  user_id: '86efc6e7-d08b-4a82-9d41-5f505b782da9' ,
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});

console.log(photo);

const caption = Caption.create({
  text: 'awesome tree',
  user_id: '86efc6e7-d08b-4a82-9d41-5f505b782da9', 
  photo_id: 'a8f2af5b-f065-4b87-8621-796ec190554c', 
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});

console.log(caption);


const exemple = Vote.create({
  value: 5,
  photo_id: 'a8f2af5b-f065-4b87-8621-796ec190554c',
  user_id: '86efc6e7-d08b-4a82-9d41-5f505b782da9'
}).then((user) => {
  console.log(user);
}).catch((error) => {
  console.error(error);
});

console.log(exemple)
