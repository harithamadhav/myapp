var express = require('express');
var router = express.Router();
var controller = require('../../controllers');

router.get('/', function(req, res) {
  var type = req.cookies.token;
  var id = req.cookies.uid;
  var name = req.cookies.name;
  if(type === 'user') {
    controller.userController.getAddress(req,res).then(function(address){
      console.log('deliveryaddr js', address);
      res.render('./user/deliveryConfirmation', {user: name, logout: 'Log out', address : address.address});
    });
  } else {
    res.render('./user/deliveryConfirmation', {user: 'Guest', logout: '', address : ''});
  }
});

router.post('/', function(req, res) {
  controller.allOrdersController.recordOrder(req, res);
});


module.exports = router;