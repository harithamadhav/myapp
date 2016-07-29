var mongoose = require('mongoose');
var schema = require('../schemas');
var allOrders = mongoose.model('allorders', schema.allOrders);

var insert = function(req, res, uid, id) {

};

var remove = function() {

};

var update = function() {

};

var recordOrder = function(req, res, id, currentOrder, number, cost, total) {
  
}

var expobj = {
  insert : insert,
  remove : remove,
  update : update
};

module.exports = expobj;