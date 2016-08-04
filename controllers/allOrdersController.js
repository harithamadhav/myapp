var models = require('../models');
var itemNumber = 0;
var orders = [];
var total;
var currentOrder = [];
var number; 
var cost;

function viewOrders(req, res) {
  models.allOrdersModel.getAllOrders().then( function(orders) {
    if(orders != null) {
      res.render('admin/allOrders', {orders : orders});
    } else {
      res.send('some error occured');
    }
  });
}

function addOrder(req, res) {
  var id = req.params.id;
  console.log('reached here in addOrder in controller...', id);
  var num = req.body.number;
  for( var m=0; m< num; m++){
    orders[itemNumber] = id;
    itemNumber = itemNumber + 1;
  }
  console.log('these are orders....',orders);
  res.redirect('/user/home');
}

function orderSummary(req, res) {
  models.foodItemsModel.getOrderSummary(orders).then(function(orderData){
    console.log('order summary is..', orderData);
    currentOrder = orderData;
    console.log('orders are...', orders);
    if(orderData != null) {
      var len = orderData.length;
      total = 0;
      number = new Array(len).fill(0);
      cost = new Array(len).fill(0);
      var total = 0;
      for( var i=0; i< orders.length; i++ ) {
        console.log('in outer loop...', orders[i]);
        for( var j=0; j< orderData.length; j++ ) {
          console.log('in inner loop...', orderData[j].id, orders[i]);
          if( orderData[j].id == orders[i] ) {
            number[j] = number[j] + 1;
            cost[j] = cost[j] + parseInt(orderData[j].offerCost);
            total = total + parseInt(orderData[j].offerCost);
          }
        }
      }

      console.log('these are being sent', orderData, number, cost, total);

      if(req.cookies.token === 'user') {
        var name = req.cookies.name+ " ";
        res.render('user/orderSummary', { user: name, logout: 'Log out', results : orderData, number : number, cost : cost, total: total });
      } else {
        res.render('user/orderSummary', { user : 'Hi,Guest ', logout : 'Log in', results : orderData, number : number, cost : cost, total: total });
      }
    } else {
      console.log('no results...');
    }
  });
}

function recordOrder(req, res) {
  var id = req.cookies.uid;
  var token = req.cookies.token;
  var total = 0;
  for (k=0; k< cost.length; k++) {
    total = total + cost[k];
  }
  console.log('sending total..', total);
  if(id != null && token === 'user') {
    console.log('in if loop..');
   // models.usersModel.findName(id).then(function(name) {
    //  var userName = name.firstName + " " + name.lastName;
   //   console.log('this is username..',userName);
    //});
    var userName = req.cookies.name;
  } else {
    var userName = 'Guest';
  }
  var items = [];
  for(var l=0; l< currentOrder.length; l++) {
    console.log('in here');
    items[l] = currentOrder[l].name;
  }
  console.log('arrived address', req.body.deliveryAddress);
  console.log('these are current order and items', currentOrder,items);
  models.allOrdersModel.insertOrder(req, res, userName, items, number, cost, total, req.body.deliveryAddress).then(function(recorded) {
    console.log('recorded...', recorded);
    res.redirect('/user/home');
  });
}

module.exports = {
  viewOrders : viewOrders,
  addOrder : addOrder,
  orderSummary : orderSummary,
  recordOrder : recordOrder
}