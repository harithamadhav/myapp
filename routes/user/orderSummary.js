var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  var type = req.cookies.token;
  if(type === 'user') {
    var name = req.cookies.name;
    res.render('./user/orderSummary',{user : name, logout: 'Log out'});
  } else {
    res.render('./user/login',{emailMsg : 'Please login to continue', passwordMsg : ''});
  }
});

module.exports = router;
