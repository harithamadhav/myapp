var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/', function(req, res) {

  res.clearCookie('token');
  res.clearCookie('name');
  res.clearCookie('uid');
  res.render('./user/login',{emailMsg : '', passwordMsg : ''});
});

router.post('/', controller.userController.login);

module.exports = router;
