var models = require('../models');
var itemNumber = 0;
var orders = [];
var total;
var currentOrder = [];
var number;
var cost;

function viewOrders(req, res) {
  models.allOrdersModel.getAllOrders().then(function(orders) {
    if (orders != null) {
      res.render('admin/allOrders', {
        orders: orders
      });
    } else {
      res.send('some error occured');
    }
  });
}

function addOrder(req, res) {
  var id = req.params.id;
  var num = req.body.number;
  for (var m = 0; m < num; m++) {
    orders[itemNumber] = id;
    itemNumber = itemNumber + 1;
  }
  res.redirect('/user/home');
}

function orderSummary(req, res) {
  models.foodItemsModel.getOrderSummary(orders).then(function(orderData) {
    currentOrder = orderData;
    if (orderData != null) {
      var len = orderData.length;
      total = 0;
      number = new Array(len).fill(0);
      cost = new Array(len).fill(0);
      var total = 0;
      for (var i = 0; i < orders.length; i++) {
        for (var j = 0; j < orderData.length; j++) {
          if (orderData[j].id == orders[i]) {
            number[j] = number[j] + 1;
            cost[j] = cost[j] + parseInt(orderData[j].offerCost);
            total = total + parseInt(orderData[j].offerCost);
          }
        }
      }
      if (req.cookies.token === 'user') {
        var name = req.cookies.name + " ";
        res.render('user/orderSummary', {
          user: name,
          logout: 'Log out',
          results: orderData,
          number: number,
          cost: cost,
          total: total
        });
      } else {
        res.render('user/orderSummary', {
          user: 'Hi,Guest ',
          logout: 'Log in',
          results: orderData,
          number: number,
          cost: cost,
          total: total
        });
      }
    }
  });
}

function recordOrder(req, res) {
  var id = req.cookies.uid;
  var token = req.cookies.token;
  var total = 0;
  for (var k = 0; k < cost.length; k++) {
    total = total + cost[k];
  }
  if (id != null && token === 'user') {
    var userName = req.cookies.name;
  } else {
    var userName = 'Guest';
  }
  var items = [];
  for (var l = 0; l < currentOrder.length; l++) {
    items[l] = currentOrder[l].name;
  }
  models.allOrdersModel.insertOrder(req, res, userName, items, number, cost, total, req.body.deliveryAddress).then(function(recorded) {
    res.redirect('/user/home');
  });
}

function removeOrder(req, res) {
  var id = req.params.id;
  for(var m = 0; m< orders.length; m++) {
    if(orders[m] === id) {
      orders.splice(m, 1);
    }
  }
  orderSummary(req, res);
}

module.exports = {
  viewOrders: viewOrders,
  addOrder: addOrder,
  orderSummary: orderSummary,
  recordOrder: recordOrder,
  removeOrder: removeOrder
}