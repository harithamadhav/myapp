var mongoose = require('mongoose');
var schema = require('../schemas');
var foodItems = mongoose.model('fooditems', schema.foodItems);
var ObjectId = require('mongodb').ObjectID;

var insert = function(req) {
  var fileName = null;
  var imageMsg = "required";
  var typeMsg = "required";
  var itemNameMsg = "required";
  var costMsg = "required";
  var offerCost = req.body.offerCost;
  if (req.body.itemName.trim() != '') {
    itemNameMsg = '';
  }
  if (req.body.select != null) {
    typeMsg = '';
  }
  if (req.body.actualCost.trim() != '') {
    costMsg = '';
  }
  if (req.hasOwnProperty('file')) {
    fileName = req.file.filename;
    imageMsg = '';
  }
  if (req.body.offerCost.trim() === '') {
    var offerCost = req.body.actualCost;
  }
  var newFood = new foodItems({
    itemtype: req.body.select,
    name: req.body.itemName.trim(),
    image: fileName,
    description: req.body.itemDescription.trim(),
    offerDescription: req.body.offerDescription.trim(),
    actualCost: req.body.actualCost.trim(),
    offerCost: offerCost.trim()
  });
  return newFood.saveAsync().then(function() {
    var msg = null;
    return msg;
  }, function(err) {
    var msg = {
      typeMsg: typeMsg,
      itemNameMsg: itemNameMsg,
      imageMsg: imageMsg,
      costMsg: costMsg
    }
    return msg;
  });
};

var getHomeData = function(req, res) {
  return foodItems.findAsync().then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
};

var getSearchData = function(req, res, text) {
  return foodItems.findAsync({
    name: text
  }).then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
};

var getItem = function(id) {
  return foodItems.findOneAsync({
    _id: id
  }).then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
};

var getOrderSummary = function(orders) {
  return foodItems.findAsync({
    _id: {
      $in: orders
    }
  }).then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
};

var getAll = function() {
  return foodItems.findAsync().then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
};

var remove = function(id) {
  return foodItems.removeAsync({
    "_id": ObjectId(id)
  }).then(function(returnval) {
    return returnval;
  });
};

var update = function(req, callback) {
  var id = req.params.id;
  var itemNameMsg = '';
  var costMsg = '';
  var offerCost = req.body.offerCost;
  if (req.body.offerCost.trim() == '') {
    offerCost = req.body.actualCost;
  }
  if (req.body.itemName.trim() === '') {
    itemNameMsg = "required";
  }
  if (req.body.actualCost.trim() === '') {
    costMsg = "required";
  }
  if (req.body.itemName.trim() != '' && req.body.actualCost.trim() != '') {
    foodItems.updateAsync({
      "_id": ObjectId(id)
    }, {
      name: req.body.itemName.trim(),
      description: req.body.itemDescription.trim(),
      offerDescription: req.body.offerDescription.trim(),
      actualCost: req.body.actualCost.trim(),
      offerCost: offerCost.trim()
    }, {
      upsert: 1
    }).then(function(updated) {
      callback(null);
    });
  } else {
    var msg = {
      itemNameMsg: itemNameMsg,
      costMsg: costMsg,
    }
    callback(msg);
  }
};

var expobj = {
  insert: insert,
  remove: remove,
  getItem: getItem,
  update: update,
  getOrderSummary: getOrderSummary,
  getHomeData: getHomeData,
  getSearchData: getSearchData,
  getAll: getAll
};

module.exports = expobj;