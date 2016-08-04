var mongoose = require('mongoose');
var schema = require('../schemas');
var allOrders = mongoose.model('allorders', schema.allOrders);

var insertOrder = function(req, res, name, items, number, cost, total, address) {
  console.log('in record model', name, items, number, cost, total);
  var newOrder = allOrders({
    userName : name,
    items : items,
    numbers : number,
    costs : cost,
    total : total,
    address : address
  });
  return newOrder.saveAsync().then(function() {
    var msg = 'successs..';
    console.log('success is here..');
    return msg;
  }, function(err) {
    return err;
  });
}

var getAllOrders = function(req, res) {
  return allOrders.findAsync().then(function(orders){
    console.log('allorders are...', orders);
    return orders;
  }, function(err) {
    console.log(err);
    return null;
  });
}

var expobj = {
  insertOrder : insertOrder,
  getAllOrders : getAllOrders
};

module.exports = expobj;