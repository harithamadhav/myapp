var mongoose = require('mongoose');
var schema = require('../schemas');
var foodItems = mongoose.model('fooditems', schema.foodItems);

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