var models = require('../models');
function viewOrders(req, res) {

}

function addOrder(req, res) {
  var id = req.params[0];
  var uid = req.cookies.uid;

  models.allOrdersModel.insert(req, res, uid, id).then( function(){

  });
}

module.exports = {
  viewOrders : viewOrders,
  addOrder : addOrder
}