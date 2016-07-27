var userController = require('./userController');
var foodItemController = require('./foodItemController');
var allOrdersController = require('./allOrdersController');

var controller = {
  userController : userController,
  foodItemController : foodItemController,
  allOrdersController : allOrdersController
}

module.exports = controller;