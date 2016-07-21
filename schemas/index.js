var allOrders = require('./allOrders');
var foodItems = require('./foodItems');
var registeredUsers = require('./registeredUsers');

var schema = {
  allOrders: allOrders,
  foodItems: foodItems,
  registeredUsers: registeredUsers 
};

module.exports = schema;