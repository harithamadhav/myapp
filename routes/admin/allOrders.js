var express = require('express');
var controller = require('../../controllers')
var router = express.Router();

router.get('/', function(req, res) {
  controller.allOrdersController.viewOrders(req, res);
});

module.exports = router;