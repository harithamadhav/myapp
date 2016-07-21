var mongoose = require('mongoose');
var schema = require('../schemas');
var allOrders = mongoose.model('allorders', schema.allOrders);

var insert = function() {

};

var remove = function() {

};

var update = function() {

};

var expobj = {
  insert : insert,
  remove : remove,
  update : update
};

module.exports = expobj;