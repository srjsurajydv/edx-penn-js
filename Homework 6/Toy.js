var mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb://localhost:27017/homework6db', { useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error in Toy.js:'));
db.once('open', function () {
  console.log('Connected to MongoDB in Toy.js');
});

var Schema = mongoose.Schema;

var toySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: Number
});

// var Toy = mongoose.model('Toy', toySchema);

// const toy1 = new Toy({
//   id: '123',
//   name: 'Dog chew toy',
//   price: 10.99
// });

// const toy2 = new Toy({
//   id: '456',
//   name: 'Dog pillow',
//   price: 25.99
// });

// toy1.save((err, toy1) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Created a toy, id=' + toy1.id);
// })

// toy2.save((err, toy2) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Created a toy, id=' + toy2.id);
// })

module.exports = mongoose.model('Toy', toySchema);