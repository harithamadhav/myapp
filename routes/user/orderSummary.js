var express = require('express');
var controller = require('../../controllers');
var router = express.Router();

router.get('/', function(req, res) {
   controller.allOrdersController.orderSummary(req, res);
});

router.post('/', function(req,res) {
  res.redirect('/user/deliveryConfirmation');
});

module.exports = router;