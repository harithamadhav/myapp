var models = require('../models');
var md5 = require('md5');
function registration(req, res) {
  var body = req.body;
  models.usersModel.insert(body).then( function(data) {
    if(data != null) {
      res.render('user/signup',{
        firstNameMsg : data.firstNameMsg,
        lastNameMsg : data.lastNameMsg,
        emailMsg : data.emailMsg,
        passwordMsg : data.passwordMsg,
        confirmPasswordMsg : data.confirmPasswordMsg,
        phoneMsg : data.phoneMsg,
        addressMsg : data.addressMsg
      });
    } else {
      res.redirect('/user/login');
    }
  }, function(e) {
    res.send("Sorry... some error occured..");
  });
}

function login(req, res) {
  var body = req.body;
  models.usersModel.login(body).then( function(data) {
    if(data != null) {
      var token = 'token';
      var name = 'name';
      var uid = 'uid';
      models.foodItemsModel.getHomeData(req).then( function(result) {
        if(result != null) {
          var length = result.length;
          var b = 0;
          var d = 0;
          var s = 0;
          var burgers = [];
          var starters = [];
          var drinks = [];
          for (var i = 0; i < length; i++) {
            if (result[i].itemtype === 'burger') {
              burgers[b] = result[i];
              b = b + 1;
            } else if (result[i].itemtype === 'starter') {
              starters[s] = result[i];
              s = s + 1;
            } else if (result[i].itemtype === 'drink') {
              drinks[d] = result[i];
              d = d + 1;
            }
          }
          if (data.userType === 'user') {
            var emailCookie = md5(body.email);
            res.cookie( token, 'user');
            res.cookie( name, data.firstName);
            res.cookie( uid, data.id);
            res.redirect('/user/home');
          } else if (data.userType === 'admin') {
            res.cookie( token, 'admin');
            res.redirect('/admin/home');
          } else {
            res.render('user/login',{
              emailMsg : 'invalid',
              passwordMsg : 'invalid'
            });          
          }
        }
      });
    }
  });
}

function getAddress(req, res){
  var id = req.cookies.uid;
  var name = req.cookies.name;
  var token = req.cookies.token;
  if(token === 'user') {
    return models.usersModel.findAddress(id).then(function (addressObj) {
      return addressObj;
    });
  } else {
    return null;
  }
}

function userProfile(req, res) {
  var id = req.cookies.uid;
  var token = req.cookies.token;
  if(token === 'user') {
    models.usersModel.findPerson(id).then(function(user) {
    res.render('user/profile',{
        firstNameMsg : '',
        lastNameMsg : '',
        emailMsg : '',
        passwordMsg : '',
        confirmPasswordMsg : '',
        phoneMsg : '',
        addressMsg : '',
        user : user
      });
    });
  } else {
    res.send('some error occured..');
  }
}

function updateProfile(req, res) {
  var id = req.cookies.uid;
  var token = req.cookies.token;
  if(token === 'user') {
    models.usersModel.update(req, res, id, function(ret)
    {
      if(ret === null) {
        res.redirect('/user/login');
      } else {
        res.render('user/profile',{
          firstNameMsg : ret.firstNameMsg,
          lastNameMsg : ret.lastNameMsg,
          emailMsg : ret.emailMsg,
          passwordMsg : ret.passwordMsg,
          confirmPasswordMsg : ret.confirmPasswordMsg,
          phoneMsg : ret.phoneMsg,
          addressMsg : ret.addressMsg,
          user : {  
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    email : req.body.email,
                    phone : req.body.phone,
                    address : req.body.permanentAddress
                  }
        });
      }
    });
  }
}

module.exports = { 
  registration : registration,
  login : login,
  getAddress : getAddress,
  userProfile : userProfile,
  updateProfile : updateProfile
};