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
  if(req.body.itemName != '') {
    itemNameMsg = '';
  }
  if(req.body.select != null) {
    typeMsg = '';
  }
  if(req.body.actualCost != '') {
    costMsg = '';
  }
  if(req.hasOwnProperty('file')){
    fileName = req.file.filename;
    imageMsg = '';
  }
  if(req.body.offerCost === '') {
    var offerCost = req.body.actualCost;
  }
  var newFood = new foodItems ({
    itemtype : req.body.select,
    name : req.body.itemName,
    image : fileName,
    description : req.body.itemDescription,
    offerDescription : req.body.offerDescription,
    actualCost : req.body.actualCost,
    offerCost : offerCost
  });

  return newFood.saveAsync().then(function() {
    var msg = null;
    return msg;
  }, function(err) {
    var msg = {
      typeMsg : typeMsg,
      itemNameMsg : itemNameMsg,
      imageMsg : imageMsg,
      costMsg : costMsg
    }
    return msg;
  });

};

var getHomeData = function(req, res) {
  return foodItems.findAsync().then(function(data){
    return data;
  }, function(err) {
    return null;
  });
}

var getSearchData = function(req, res, text) {
  return foodItems.findAsync({name : text}).then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
}

var getItem = function(id) {
  return foodItems.findOneAsync( {_id : id} ).then(function(data) {
    return data;
  }, function(err) {
    return null;
  });
}

var getOrderSummary = function(orders){
  return foodItems.findAsync( {_id : {$in: orders}} ).then(function(data) {
    return data;
  }, function (err) {
    return null;
  });
}

var getAll = function() {
  return foodItems.findAsync().then(function(data) {
    return data;
  }, function (err) {
    return null;
  });
}

var remove = function(id) {
  return foodItems.removeAsync( { "_id" : ObjectId(id) } ).then( function(returnval){
    return returnval;
  });
}

var update = function (req, callback) {
  var id = req.params.id;
  var itemNameMsg = '';
  var costMsg = '';
  var offerCost = req.body.offerCost;
  if( req.body.offerCost == '') {
    offerCost = req.body.actualCost;
  }
  if (req.body.itemName === ''){
    itemNameMsg = "required";
  }
  if (req.body.actualCost === '') {
    costMsg = "required";
  }
  if( req.body.itemName != '' && req.body.actualCost != '' ) {
    foodItems.updateAsync( 
    { "_id" : ObjectId(id) },
    {
      name : req.body.itemName,
      description : req.body.itemDescription,
      offerDescription : req.body.offerDescription,
      actualCost : req.body.actualCost,
      offerCost : offerCost
    },
    { upsert : 1}).then( function(updated) {
     callback (null);
   });
  } else {
    var msg = {
      itemNameMsg : itemNameMsg,
      costMsg  : costMsg,
    }
    callback (msg);
  }
};

var expobj = {
  insert : insert,
  remove : remove,
  getItem : getItem,
  update : update,
  getOrderSummary : getOrderSummary,
  getHomeData : getHomeData,
  getSearchData : getSearchData,
  getAll : getAll
};

module.exports = expobj;