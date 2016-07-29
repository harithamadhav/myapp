var mongoose = require('mongoose');
var foodItems = new mongoose.Schema({
  foodId : 
  { 
    type: Number, 
    Default: null, 
    required: true,
    unique: true
  },
  itemtype :
  {
    type: String,
    enum: ['burger','starter','drink','top'],
    required: true,
    Default: null
  },
  name : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  image : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  description : 
  { 
    type: String, 
    Default : null, 
    required: true 
  },
  offerDescription : 
  { 
    type: String, 
    Default: null, 
    required: false
  },
  actualCost : 
  { 
    type: Number, 
    Default: null, 
    required: true 
  },
  offerCost : 
  { 
    type: Number, 
    Default: null, 
    required: false 
  },
});

module.exports = foodItems;