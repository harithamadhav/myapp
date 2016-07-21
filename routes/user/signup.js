var express = require('express');
var router = express.Router();
var userController = require('../../controllers/userController');

/* GET home page. */
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

router.post('/', userController.registration);

module.exports = router;
