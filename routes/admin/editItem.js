var express = require('express');
var controller = require('../../controllers')
var router = express.Router();

router.get('/:id', function(req, res) {
  var type = req.cookies.token;
  var id = req.params.id;
  if(type === 'admin') {
    controller.foodItemController.editItem(req, res);
  }
});

router.post('/:id', function(req, res) {
  var type = req.cookies.token;
  if(type === 'admin') {
    controller.foodItemController.update(req, res);
  }
});

module.exports = router;