var models = require('../models');
function addItem(req, res) {
  var body = req.body;
  var files = req.file;
  console.log(body);
  console.log('reached here in food controller.............');
  models.foodItemsModel.insert(req).then( function(data) {
    if(data != null){
      console.log(data);
      res.send('Some required fields are empty');
    } else {
      res.send('addition successful');
    }
  })
}

function deleteItem(req, res) {

}

function loadHomePage(req, res, type) {
  models.foodItemsModel.getHomeData(req).then( function(data) {
    if(data != null){
      console.log(data);
      var length = data.length;
      var b = 0;
      var d = 0;
      var s = 0;
      var burgers = [];
      var starters = [];
      var drinks = [];
      for (var i = 0; i < length; i++) {
        if (data[i].itemtype === 'burger') {
          burgers[b] = data[i];
          b = b + 1;
        } else if (data[i].itemtype === 'starter') {
          starters[s] = data[i];
          s = s + 1;
        } else if (data[i].itemtype === 'drink') {
          drinks[d] = data[i];
          d = d + 1;
        }
      }
      if(type === 'admin') {
        res.render('admin/home', { burgers : burgers, starters : starters, drinks : drinks});
      } else if(type === 'user') {
        var name = req.cookies.name;
        res.render('user/home', { user : name, logout : 'Log out', burgers : burgers, starters : starters, drinks : drinks});
      } else {
        res.render('user/home', { user : 'Guest', logout : '', burgers : burgers, starters : starters, drinks : drinks});
      }
    } else {
      res.send('some error occured.... in home controller');
    }
  });
}

function search(req, res) {
  models.foodItemsModel.getSearchData(req, res).then( function(data) {
    if(data != null) {
      console.log('search result is...'data);
      res.render('user/search', { results : results });
    }
  });
}
 
module.exports = {
  addItem : addItem,
  deleteItem : deleteItem,
  loadHomePage : loadHomePage,
  search : search
};