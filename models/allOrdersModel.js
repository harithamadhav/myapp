var mongoose = require('mongoose');
var schema = require('../schemas');
var allOrders = mongoose.model('allorders', schema.allOrders);

var insert = function(req, res, uid, id) {
  var oid = req.cookies.oid;
  if(oid === 'null') {
    var newOrder = new allOrders({
      userId : uid,
      items : {
        
      }
    });
  }
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