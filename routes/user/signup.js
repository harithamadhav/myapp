var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/', function(req, res) {
  res.render('./user/signup', {
      firstNameMsg : '',
      lastNameMsg : '',
      emailMsg : '',
      passwordMsg : '',
      confirmPasswordMsg : '',
      phoneMsg : '',
      addressMsg : ''
    });
});

router.post('/', controller.userController.registration);

module.exports = router;