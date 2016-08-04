var mongoose = require('mongoose');
var schema = require('../schemas');
var foodItems = mongoose.model('fooditems', schema.foodItems);
var ObjectId = require('mongodb').ObjectID;

var insert = function(req) {
  console.log('req.file is...',req.file);
  var type = req.body.add;
  var fileName = null;
  var offerCost = req.body.offerCost;
  if(req.hasOwnProperty('file')){
    fileName = req.file.filename;
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
    console.log('err in model',err.name);
    return err;
  });

};

var getHomeData = function(req, res) {
  return foodItems.findAsync().then(function(data){
    return data;
  }, function(err) {
    console.log('err in home model..', err.name);
    return null;
  });
}

var getSearchData = function(req, res, text) {
  return foodItems.findAsync({name : text}).then(function(data) {
    return data;
  }, function(err) {
    console.log('err in search..',err.name);
    return null;
  });
}

var getItem = function(id) {
  return foodItems.findOneAsync( {_id : id} ).then(function(data) {
    return data;
  }, function(err) {
    console.log(err.name);
    return null;
  });
}

var getOrderSummary = function(orders){
  return foodItems.findAsync( {_id : {$in: orders}} ).then(function(data) {
    console.log(data);
    return data;
  }, function (err) {
    console.log(err.name);
    return null;
  });
}

var getAll = function() {
  return foodItems.findAsync().then(function(data) {
    console.log('all items...',data);
    return data;
  }, function (err) {
    console.log(err.name);
    return null;
  });
}

var remove = function(id) {
  return foodItems.removeAsync( { "_id" : ObjectId(id) } ).then( function(returnval){
    console.log('deleted..', returnval);
    return returnval;
  });
}

var update = function(id) {
  var offerCost = req.body.offerCost;
  if( req.body.offerCost == '') {
    offerCost = req.body.actualCost;
  }
  return foodItems.updateAsync( 
    { "_id" : ObjectId(id) },
    {
      name : req.body.itemName,
      description : req.body.itemDescription,
      offerDescription : req.body.offerDescription,
      actualCost : req.body.actualCost,
      offerCost : offerCost
    },
    { upsert : 1}).then( function(updated) {
     return updated;
    }, function(err) {
     console.log(err.name);
     return null;
  });
}

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