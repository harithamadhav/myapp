var mongoose = require('mongoose');
var allOrders = new mongoose.Schema({
  orderId : 
  { 
    type: String, 
    Default: null, 
    required: true,
    unique: true
  },
  userId : 
  { 
    type: Number, 
    Default: null, 
    required: true
  },
  items : 
  [{ foodId : 
    { 
      type: Number, 
      Default: null, 
      required: true 
    },
  }]
});

module.exports = allOrders;