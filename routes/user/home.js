var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var type = req.cookies.token;
  if(type === 'admin') {
    res.render('./admin/home');
  } else if(type === 'user') {
    var name = req.cookies.name;
    res.render('./user/home', {user : name, logout : 'Log out'});
  } else {
    res.render('./user/home', {user : 'Guest', logout : ''});
  }
});

module.exports = router;