var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/', function(req, res) {
  var type = req.cookies.token;
  if(type === 'admin') {
    controller.foodItemController.search(req, res);
  } else if(type === 'user') {
    var name = req.cookies.name;
    controller.foodItemController.search(req, res);
  } else {
    type = null;
    controller.foodItemController.search(req, res);
  }
});

router.post('/', controller.foodItemController.search);

module.exports = router;