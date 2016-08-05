var mongoose = require('mongoose');
var allOrders = new mongoose.Schema({
  userName :
  {
    type: String,
    Default: null,
    required: true
  },
  items :
  [{
    type: String,
    Default: null,
    required: true
  }],
  numbers :
  [{
    type: Number,
    Default: null,
    required: true
  }],
  costs :
  [{
    type: Number,
    Default: null,
    required: true
  }],
  total :
  {
    type: Number,
    Default: null,
    required: true
  },
  address :
  {
    type: String,
    Default: null,
    required: true
  }
});

module.exports = allOrders;