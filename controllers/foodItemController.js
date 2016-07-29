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
  var text = req.body.searchText;
  console.log(text);
  models.foodItemsModel.getSearchData(req, res, text).then( function(results) {
    if(results != null) {
      if(req.cookies.token === 'user') {
        var name = req.cookies.name;
        console.log('search result is...', results);
        res.render('user/search', { user: name, logout: 'Log out', results : results });
      } else if(req.cookies.token === 'admin') {
        res.render('user/search', { user: 'ADMIN', logout: 'Log out', results : results });
      } else {
        res.render('user/search', { user : 'Guest', logout : '', results : results});
      }
    } else {
      console.log('no results...');
      res.render('user/search', { results : '' });
    }
  });
}

function description(req, res, type, name, id) {
  console.log('in food controller', id);
  models.foodItemsModel.getItem(id).then( function(result) {
    if(result != null) {
      if(type === 'user') {
        console.log(result);
        res.render('user/description', { user : name, logout: 'Log out', result : result });
      } else if(type === 'ADMIN') {
        res.send('consrtuction pending...');
      } else {
        res.render('user/description', { user : 'Guest', logout: '', result : result });
      }
    } else {
      console.log('no results..');
      res.render('user/description', { result : ''});
    }
  })
}
 
module.exports = {
  addItem : addItem,
  deleteItem : deleteItem,
  loadHomePage : loadHomePage,
  search : search,
  description : description
};