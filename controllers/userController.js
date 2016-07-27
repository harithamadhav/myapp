var models = require('../models');
var md5 = require('md5');
function registration(req, res) {
  var body = req.body;
  console.log(body);
  models.usersModel.insert(body).then( function(data) {
    console.log("is this it????",data);
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
      console.log("done");
    } else {
      res.redirect('/user/login');
    }
  }, function(e) {
    res.send("Sorry... some error occured..");
    console.log(e);
  });
}

function login(req, res) {
  var body = req.body;
  models.usersModel.login(body).then( function(data) {
    console.log('in controller, model returned ',data);
    if(data != null) {
      var token = 'token';
      var name = 'name';
      var uid = 'uid';
      models.foodItemsModel.getHomeData(req).then( function(result) {
        if(result != null) {
          console.log(result);
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
            res.render('user/home', { user : data.firstName, logout : 'Log out', burgers : burgers, starters : starters, drinks : drinks, userData : data});
          } else if (data.userType === 'admin') {
            res.cookie( token, 'admin');
            res.render('admin/home', { burgers : burgers, starters : starters, drinks : drinks});
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

module.exports = { 
  registration : registration,
  login : login
};