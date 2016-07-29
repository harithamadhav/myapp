var models = require('../models');
var itemNumber = 0;
var orders = [];
var total = 0;
var currentOrder = [];
var number = new Array(len).fill(0);
var cost = new Array(len).fill(0);
function viewOrders(req, res) {

}

function addOrder(req, res) {
  var id = req.params.id;
  console.log('reached here in addOrder in controller...', id);
  orders[itemNumber] = id;
  itemNumber = itemNumber+1;
  console.log(orders);
  res.redirect('/user/description/'+id);
}

function orderSummary(req, res) {
  models.foodItemsModel.getOrderSummary(orders).then(function(orderData){
    console.log('order summary is..', orderData);
    currentOrder = orderData;
    console.log('orders are...', orders);
    if(orderData != null) {
      var len = orderData.length;

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
        var name = req.cookies.name;
        res.render('user/orderSummary', { user: name, logout: 'Log out', results : orderData, number : number, cost : cost, total: total });
      } else {
        res.render('user/orderSummary', { user : 'Guest', logout : '', results : orderData, number : number, cost : cost, total: total });
      }
    } else {
      console.log('no results...');
    }
  });
}

function checkOut(req, res) {
  var id = req.cookies.uid;
  var name = req.cookies.name;
  var token = req.cookies.token;
  if(token === 'user') {
    models.usersModel.findAddress(id).then(function (addressObj) {
      console.log('delivery address....',addressObj);
      res.render('user/deliveryConfirmation', {user: name, logout: 'Log out', address : addressObj.address});
    });
  } else {
    res.render('user/deliveryConfirmation', {user: 'Guest', logout: '', address : ''});
  }
}

function deliveryAddress(req, res) {
  var id = req.cookies.uid;
  var token = req.cookies.token;
  if(token === 'user') {
    models.allOrdersModel.recordOrder(req, res, id, currentOrder, number, cost, total).then(function(recorded) {
      console.log('recorded...', recorded);
    });
  }
}

module.exports = {
  viewOrders : viewOrders,
  addOrder : addOrder,
  orderSummary : orderSummary,
  checkOut :checkOut,
  deliveryAddress : deliveryAddress
}