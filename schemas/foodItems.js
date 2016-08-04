var mongoose = require('mongoose');
var foodItems = new mongoose.Schema({
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
    required: false 
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