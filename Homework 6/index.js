var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

// app.use('/', (req, res) => {
//   res.json({ msg: 'It works!' });
// });

app.use('/findToy', (req, res) => {
  var query = {};
  if (req.query.id) {
    query.id = req.query.id;
  }
  console.log('/findToy', query);
  if (Object.keys(query).length != 0) {
    var id = req.query.id;
    Toy.findOne({ id: id }, (err, toy) => {
      if (err) {
        res.type('html').status(500);
        res.send('Error: ' + err);
      } else if (!toy) {
        res.json({});
      } else {
        res.json(toy);
      }
    })
  } else {
    res.json({});
  }
});

app.use('/findAnimals', (req, res) => {
  var query = {};
  if (req.query.species) {
    query.species = req.query.species;
  }
  if (req.query.trait) {
    query.traits = req.query.trait;
  }
  if (req.query.gender) {
    query.gender = req.query.gender;
  }
  console.log('/findAnimals', query);
  if (Object.keys(query).length != 0) {
    Animal.find(query, (err, animals) => {
      if (err) {
        res.type('html').status(500);
        res.send('Error: ' + err);
      } else if (animals.length == 0) {
        res.json({});
      } else {
        var data = [];
        animals.forEach(a => {
          var animal = {};
          animal.name = a.name;
          animal.species = a.species;
          animal.breed = a.breed;
          animal.gender = a.gender;
          animal.age = a.age;
          data.push(animal);
        });
        res.send(data);
      }
    });
  } else {
    res.json({});
  }
});

app.use('/animalsYoungerThan', (req, res) => {
  var query = {};
  if (!isNaN(req.query.age)) {
    query.age = { $lt: Number(req.query.age) };
  }
  console.log('/animalsYoungerThan', query);
  if (Object.keys(query).length != 0) {
    Animal.find(query, (err, animals) => {
      if (err) {
        res.type('html').status(500);
        res.send('Error: ' + err);
      } else if (animals.length == 0) {
        var json = { count: 0 };
        res.json(json);
      } else {
        var json = {};
        var count = animals.length;
        var names = [];
        animals.forEach(a => {
          names.push(a.name);
        });
        json.count = count;
        json.names = names;
        res.json(json);
      }
    });
  } else {
    res.json({});
  }
});

app.use('/calculatePrice', (req, res) => {
  var query = {};
  if (req.query.id.length != 0) {
    query.id = req.query.id;
  }
  if (req.query.qty.length != 0) {
    query.qty = req.query.qty;
  }
  console.log('/calculatePrice', query);
  if (Object.keys(query).length != 0 &&
    query.id.length == query.qty.length) {
    var toyMap = new Map();
    for (var i = 0; i < query.id.length; i++) {
      if (query.id[i]) {
        var qty = toyMap.get(query.id[i]);
        if (qty) {
          qty += Number(query.qty[i]);
          toyMap.set(query.id[i], qty);
        } else {
          toyMap.set(query.id[i], Number(query.qty[i]));
        }
      }
    }
    Toy.find({ id: { $in: query.id } }, (err, toys) => {
      if (err) {
        res.type('html').status(500);
        res.send('Error: ' + err);
      } else {
        var json = {};
        var totalPrice = 0;
        var items = [];
        toys.forEach(t => {
          var qty = toyMap.get(t.id);
          if (!isNaN(qty) && qty >= 1) {
            var toy = {};
            toy.id = t.id;
            toy.qty = qty;
            toy.subtotal = t.price * qty;
            items.push(toy);
            totalPrice += toy.subtotal;
          }
        });
        json.totalPrice = totalPrice;
        json.items = items;
        res.json(json);
      }
    });
  } else {
    res.json({});
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// Please do not delete the following line; we need it for testing! 
module.exports = app;