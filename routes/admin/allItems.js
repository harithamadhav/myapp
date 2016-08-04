var express = require('express');
var controller = require('../../controllers')
var router = express.Router();

router.get('/', function(req, res) {
  controller.foodItemController.loadAllItems(req, res);
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  controller.foodItemController.deleteItem(req, res, id);
});

module.exports = router;