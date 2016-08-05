var mongoose = require('mongoose');
var schema = require('../schemas');
var allOrders = mongoose.model('allorders', schema.allOrders);

var insertOrder = function(req, res, name, items, number, cost, total, address) {
  var newOrder = allOrders({
    userName: name,
    items: items,
    numbers: number,
    costs: cost,
    total: total,
    address: address
  });
  return newOrder.saveAsync().then(function() {
    var msg = 'successs..';
    return msg;
  }, function(err) {
    return err;
  });
};

var getAllOrders = function(req, res) {
  return allOrders.findAsync().then(function(orders) {
    return orders;
  }, function(err) {
    return null;
  });
};

var expobj = {
  insertOrder: insertOrder,
  getAllOrders: getAllOrders
};

module.exports = expobj;