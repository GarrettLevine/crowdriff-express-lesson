const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/User');

const app = express();
mongoose.connect('nope');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get('/user', (req, res) => {
  new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) reject(err);

      resolve(users);
    });
  })
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.json(err);
  });
});

app.post('/user/create', (req, res) => {
  new Promise((resolve, reject) => {
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.jerk = req.body.jerk;

    user.save((err, user) => {
      if (err) reject(err);

      resolve(user);
    });
  })
  .then(user => {
    res.json(user);
  })
  .catch(err => {
    res.json(err);
  });
});

app.post('/user/:id/update', (req, res) => {
  new Promise((resolve, reject) => {
     User.findById(req.params.id, (err, user) => {
       if (err) reject(err);
       resolve(user);
     });
  })
  .then(user => {
    user.firstName = req.body.firstName || user.firstname;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.jerk = req.body.jerk || user.jerk;

    return user.save();
  })
  .then(updateUser => {
    res.json(updateUser);
  })
  .catch(err => {
    res.json(err);
  });
});

app.listen(port);
console.log(`Its all happening on port: ${port}`);
