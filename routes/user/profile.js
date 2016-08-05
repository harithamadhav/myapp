var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/', function(req, res) {
  controller.userController.userProfile(req, res);
});

router.post('/', function(req, res) {
  controller.userController.updateProfile(req, res);
});

module.exports = router;