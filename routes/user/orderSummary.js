var express = require('express');
var controller = require('../../controllers');
var router = express.Router();


router.get('/', function(req, res) {
  /*var type = req.cookies.token;
  if(type === 'user') {
    var name = req.cookies.name;
    //res.render('./user/orderSummary',{user : name, logout: 'Log out'});
    controller.allOrdersController.orderSummary(req, res);
  } else {
    res.render('./user/login',{emailMsg : 'Please login to continue', passwordMsg : ''});
  }*/
   controller.allOrdersController.orderSummary(req, res);
});

router.post('/', function(req,res) {
  res.redirect('/user/deliveryConfirmation');
});

module.exports = router;