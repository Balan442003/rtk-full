const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage:{
    type: String,
  }

}, {
  collection: 'users' 
});


const User = mongoose.model('User', userSchema);

module.exports = User;
