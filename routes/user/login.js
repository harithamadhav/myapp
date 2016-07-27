var express = require('express');
var router = express.Router();
var controller = require('../../controllers');
//var loginController = "bla";

/* GET home page. */

router.get('/', function(req, res) {

  res.clearCookie('token');
  res.clearCookie('name');
  res.render('./user/login',{emailMsg : '', passwordMsg : ''});
});
router.post('/', controller.userController.login);

module.exports = router;


/////////////////////////////
/*loginController
var loginmodel = require("model");
loginCheck() {
 data = loginmodel.loginCheck123()
 if(data) {

 } 
}*/

////////////////////////////////////
/*
userSchema = require('schema').user;
usermodel = mongoose.model("dasd", userSchema);

loginCheck123(data) {
  var data = usermodel.findOne({'user': data.username, 'pwd': data.pwd})
  if(data) {

  }
}*/