var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/', function(req, res) {
  var type = req.cookies.token;

  if(type === 'admin') {
    controller.foodItemController.loadHomePage(req, res, type);
  } else if(type === 'user') {
    var name = req.cookies.name;
    controller.foodItemController.loadHomePage(req, res, type);
  } else {
    type = null;
    controller.foodItemController.loadHomePage(req, res, type);
  }
});

module.exports = router;