var models = require('../models');
var itemNumber = 0;
var orders = [];
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
    if(orderData != null) {
      var number = [];
      var cost = [];
      var results = [];
      var total = 0;
      for( var i=0; i< orders.length; i++ ) {
        for (var j=0; j<orderData.lenght; j++ ) {
          if( orderData[j].id === orders[i] ) {
            number[j] = number[j] + 1;
            cost[j] = cost[j] + orderData[j].offerCost;
            total = total + orderData[j].offerCost;
          }
        }
      }

      if(req.cookies.token === 'user') {
        var name = req.cookies.name;
        res.render('user/orderSummary', { user: name, logout: 'Log out', results : orderData, number : number, cost : cost, total: total });
      } else {
        res.render('user/orderSummary', { user : 'Guest', logout : '', results : orderData, number : number, cost : cost, total: total });
      }
    } else {
      console.log('no results...');
    }
  })
}

module.exports = {
  viewOrders : viewOrders,
  addOrder : addOrder,
  orderSummary : orderSummary
}