var mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb://localhost:27017/homework6db', { useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error in Animal.js:'));
db.once('open', function () {
  console.log('Connected to MongoDB in Animal.js');
});

var Schema = mongoose.Schema;

var animalSchema = new Schema({
  name: { type: String, required: true, unique: true },
  species: { type: String, required: true },
  breed: String,
  gender: { type: String, enum: ['male', 'female'] },
  traits: [String],
  age: Number
});

// var Animal = mongoose.model('Animal', animalSchema);

// var animal1 = new Animal({
//   name: 'Cooper',
//   species: 'Dog',
//   breed: 'Catahoula',
//   gender: 'male',
//   age: 11,
//   traits: ['crazy', 'funny']
// });

// var animal2 = new Animal({
//   name: 'Lola',
//   species: 'Dog',
//   breed: 'Beagle',
//   gender: 'female',
//   age: 5,
//   traits: ['loyal', 'friendly']
// });

// var animal3 = new Animal({
//   name: 'Garfield',
//   species: 'Cat',
//   breed: 'Tabby',
//   gender: 'male',
//   age: 39,
//   traits: ['lazy', 'hungry']
// });

// var animal4 = new Animal({
//   name: 'Felix',
//   species: 'Cat',
//   breed: 'Tuxedo',
//   gender: 'male',
//   age: 98,
//   traits: ['funny', 'loyal']
// });

// animal1.save((err, animal1) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Created an animal, name=' + animal1.name);
// })

// animal2.save((err, animal2) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Created an animal, name=' + animal2.name);
// })

// animal3.save((err, animal3) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Created an animal, name=' + animal3.name);
// })

// animal4.save((err, animal4) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Created an animal, name=' + animal4.name);
// })

module.exports = mongoose.model('Animal', animalSchema);