var express = require('express');
var router = express.Router();
//var loginController = "bla";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});
router.post('/', function(req, res) {
//  return loginController.loginCheck(req.body);  
});

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