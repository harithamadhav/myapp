var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/:id', function(req, res) {
  var type = req.cookies.token;
  var id = req.params.id;
  if( type === 'user') {
    var name = req.cookies.name;
  } else {
    var name = null;
  }
  controller.foodItemController.description(req, res, type, name, id);
});

router.post('/:id', function(req, res) {
  controller.allOrdersController.addOrder(req, res);
});

module.exports = router;