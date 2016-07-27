var mongoose = require('mongoose');
var schema = require('../schemas');
var promise = require('bluebird');
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
    userId : 0010,
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
    console.log('success is here..');
    return msg;
  }, function(err) {
    console.log(err);
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
}

var update = function() {

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
  });
};

var exportObj = {
  insert : insert,
  update : update,
  login : login
}

module.exports = exportObj;