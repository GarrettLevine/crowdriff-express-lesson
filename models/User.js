const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  jerk: {
    type: Boolean,
  },
});

module.exports = mongoose.model('User', UserSchema);