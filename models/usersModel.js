var mongoose = require('mongoose');
var schema = require('../schemas');
var promise = require('bluebird');
var ObjectId = require('mongodb').ObjectID;
promise.promisifyAll(mongoose);
var md5 = require('md5');
var users = mongoose.model('registeredusers', schema.registeredUsers);
var validEmail = /^(([0-9a-zA-Z\!#\$%&'\*\+\-\/\=\?\^_`\{\|\}~("")]+?\.)*[0-9a-zA-Z\!#\$%&'\*\+\-\/\=\?\^_`\{\|\}~("")]+?)@(?:(?:(:?[0-9a-zA-Z\-]+\.)*[0-9a-zA-Z\-]+)|(?:\[.+?\]))$/g;

var insert = function(body) {
  if (!validEmail.test(body.email)) {
    var emailMsg = "invalid";
  }
   if (body.email === '') {
    var emailMsg = "required";
  } else {
    var emailMsg = '';
  }

  var hash = null;
  var confirmPasswordMsg = "required";
  if (body.password != body.confirmPassword) {
    var confirmPasswordMsg = "not matching";
    var hash = null;
  } else if (body.password != '') {
    var confirmPasswordMsg = '';
    var hash = md5(body.password);
  }
  
  var newUser = new users ({
    userType : 'user',
    firstName : body.firstName,
    lastName : body.lastName,
    email : body.email,
    password : hash,
    phone : body.phone,
    address : body.permanentAddress
  });
  
  return newUser.saveAsync().then(function() {
    var msg = null;
    return msg;
  }, function(err) {
    if(err.name === 'MongoError'){
      var msg = { 
        firstNameMsg : '',
        lastNameMsg : '',
        emailMsg : 'already used',
        passwordMsg : '',
        confirmPasswordMsg : '',
        phoneMsg : '',
        addressMsg : ''
      }
      return msg;
    } else {
      
      if (err.errors.hasOwnProperty('firstName')) {
      var firstNameMsg = err.errors.firstName.kind;
      } else {
      var firstNameMsg = '';
    }
      if (err.errors.hasOwnProperty('lastName')) {
      var lastNameMsg = err.errors.lastName.kind;
      } else {
      var lastNameMsg = '';
    }
      if (err.errors.hasOwnProperty('password')) {
      var passwordMsg = err.errors.password.kind;
      } else {
      var passwordMsg = '';
    }
      if (err.errors.hasOwnProperty('phone')) {
      var phoneMsg = err.errors.phone.kind;
      } else {
      var phoneMsg = '';
    }
      if (err.errors.hasOwnProperty('address')) {
      var addressMsg = err.errors.address.kind;
      } else {
      var addressMsg = '';
    }
      var msg = {
        firstNameMsg : firstNameMsg,
        lastNameMsg : lastNameMsg,
        emailMsg : emailMsg,
        passwordMsg : passwordMsg,
        confirmPasswordMsg : confirmPasswordMsg,
        phoneMsg : phoneMsg,
        addressMsg : addressMsg
      }
      return msg;
    }
  });
};

var login = function(body) {
  
  var email = body.email;
  if (!validEmail.test(body.email)) {
    var emailMsg = "invalid";
  } else if (body.email === '') {
    var emailMsg = "required";
  } else {
    var emailMsg = '';
  }
  var password = md5(body.password);
  
  return users.findOneAsync({'email': email,'password':password}).then(function(result){
    
    return result;
  }, function(err){
    return null;
  });
};

var findAddress = function(id) {
  return users.findOneAsync({_id : id}, {address : 1, _id : 0}).then(function(address) {
    return address;
  }, function(err) {
    return null;
  });
};

var findName = function(id) {
  return users.findOneAsync({_id : id}, {firstName : 1, lastName:1, _id : 0}).then(function(name) {
    return name;
  }, function(err) {
    return null;
  });
};

var findPerson = function(id) {
  return users.findOneAsync( {_id : id }).then(function(user) {
    return user;
  }, function(err) {
    return null;
  });
};

var update = function(req, res, id, callback) {
  if (!validEmail.test(req.body.email)) {
    var emailMsg = "invalid";
  }
   if (req.body.email === '') {
    var emailMsg = "required";
  } else {
    var emailMsg = '';
  }
  var hash = '';
  if (req.body.confirmPassword === ''){
    var confirmPasswordMsg = "required";
  }
  if (req.body.password != req.body.confirmPassword) {
    var confirmPasswordMsg = "not matching";
  } else if (req.body.password != '') {
    var confirmPasswordMsg = '';
    var hash = md5(req.body.password);
  }
  if (req.body.firstName === '') {
    var firstNameMsg = "required";
  } else {
    var firstNameMsg = '';
  }
  if (req.body.lastName === '') {
    var lastNameMsg = "required";
  } else {
    var lastNameMsg = '';
  }
  if (req.body.password ==='') {
    var passwordMsg = "required";
  } else {
    var passwordMsg = '';
  }
  if (req.body.phone === '') {
    var phoneMsg = "required";
  } else {
    var phoneMsg = '';
  }
  if (req.body.permanentAddress === '') {
    var addressMsg = "required";
  } else {
    var addressMsg = '';
  }

  if(req.body.firstName != '' && req.body.lastName != '' && req.body.email != '' && validEmail.test(req.body.email) && req.body.password != '' && req.body.confirmPassword != '' && req.body.phone != '' && req.body.permanentAddress != '' && req.body.confirmPassword === req.body.password) {
    users.updateAsync( 
    { "_id" : ObjectId(id) },
    {
      userType : 'user',
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : hash,
      phone : req.body.phone,
      address : req.body.permanentAddress
    },
    { upsert : 1}).then( function() {
      callback(null);
    });
  } else {
    var msg = {
      firstNameMsg : firstNameMsg,
      lastNameMsg : lastNameMsg,
      emailMsg : emailMsg,
      passwordMsg : passwordMsg,
      confirmPasswordMsg : confirmPasswordMsg,
      phoneMsg : phoneMsg,
      addressMsg : addressMsg
    }
    callback(msg);
  }
};

var exportObj = {
  insert : insert,
  update : update,
  login : login,
  findAddress : findAddress,
  findName : findName,
  findPerson : findPerson
};

module.exports = exportObj;