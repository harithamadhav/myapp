var mongoose = require('mongoose');
var schema = require('../schemas');
var foodItems = mongoose.model('fooditems', schema.foodItems);

var insert = function(req) {
  console.log('req.file is...',req.file);
  var type = req.body.add;
  var fileName = null;
  if(req.hasOwnProperty('file')){
    fileName = req.file.filename;
  }

  var newFood = new foodItems ({
    foodId : 0003,
    itemtype : 'burger',
    name : req.body.itemName,
    image : fileName,
    description : req.body.itemDescription,
    offerDescription : req.body.offerDescription,
    actualCost : req.body.actualCost,
    offerCost : req.body.offerCost
  });

  return newFood.saveAsync().then(function() {
    var msg = null;
    return msg;
  }, function(err) {
    console.log('err in model',err.name);
    return err;
  });

};

var remove = function() {

};

var update = function() {

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
  return foodItems.findOneAsync({_id : id}).then(function(data) {
    return data;
  }, function(err) {
    console.log(err.name);
    return null;
  });
}
var expobj = {
  insert : insert,
  remove : remove,
  update : update,
  getItem : getItem,
  getHomeData : getHomeData,
  getSearchData : getSearchData
};

module.exports = expobj;