var mongoose = require('mongoose');
var registeredUsers = new mongoose.Schema({
  userId :
  { 
    type: Number, 
    Default: null, 
    required: true,
    unique: true 
  },
  firstName : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  lastName : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  email : 
  { 
    type: String, 
    Default: null, 
    required: true,
    match: /^(([0-9a-zA-Z\!#\$%&'\*\+\-\/\=\?\^_`\{\|\}~("")]+?\.)*[0-9a-zA-Z\!#\$%&'\*\+\-\/\=\?\^_`\{\|\}~("")]+?)@(?:(?:(:?[0-9a-zA-Z\-]+\.)*[0-9a-zA-Z\-]+)|(?:\[.+?\]))$/g,
    unique: true
  },
  password : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  phone : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  address : 
  { 
    type: String, 
    Default: null, 
    required: true 
  }
});

module.exports = registeredUsers;