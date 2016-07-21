var mongoose = require('mongoose');
var foodItems = new mongoose.Schema({
  foodId : 
  { 
    type: Number, 
    Default: null, 
    required: true,
    unique: true
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
  cost : 
  { 
    type: String, 
    Default: null, 
    required: true 
  },
  offerDescription : 
  { 
    type: String, 
    Default: null, 
    required: true 
  }
});

module.exports = foodItems;