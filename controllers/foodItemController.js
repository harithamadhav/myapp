var models = require('../models');

function addItem(req, res) {
  var body = req.body;
  var files = req.file;
  models.foodItemsModel.insert(req).then(function(data) {
    if (data != null) {
      res.render('./admin/addItem', {
        typeMsg: data.typeMsg,
        itemNameMsg: data.itemNameMsg,
        imageMsg: data.imageMsg,
        costMsg: data.costMsg
      });
    } else {
      res.redirect('/admin/home');
    }
  });
}

function loadHomePage(req, res, type) {
  models.foodItemsModel.getHomeData(req).then(function(data) {
    if (data != null) {
      var length = data.length;
      var b = 0;
      var d = 0;
      var s = 0;
      var t = 0;
      var burgers = [];
      var starters = [];
      var drinks = [];
      var tops = [];
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
        } else if (data[i].itemtype === 'top') {
          tops[t] = data[i];
          t = t + 1;
        }
      }
      if (type === 'admin') {
        res.render('admin/home', {
          burgers: burgers,
          starters: starters,
          drinks: drinks,
          tops: tops
        });
      } else if (type === 'user') {
        var name = "Hi," + req.cookies.name + " ";
        res.render('user/home', {
          user: name,
          logout: 'Log out',
          burgers: burgers,
          starters: starters,
          drinks: drinks,
          tops: tops
        });
      } else {
        res.render('user/home', {
          user: 'Hi,Guest ',
          logout: 'Log in',
          burgers: burgers,
          starters: starters,
          drinks: drinks,
          tops: tops
        });
      }
    } else {
      res.send('some error occured.... in home controller');
    }
  });
}

function search(req, res) {
  var text = req.body.searchText;
  models.foodItemsModel.getSearchData(req, res, text).then(function(results) {
    if (results != null) {
      if (req.cookies.token === 'user') {
        var name = "Hi," + req.cookies.name + " ";
        res.render('user/search', {
          user: name,
          logout: 'Log out',
          results: results
        });
      } else if (req.cookies.token === 'admin') {
        res.render('user/search', {
          user: 'ADMIN ',
          logout: 'Log out',
          results: results
        });
      } else {
        res.render('user/search', {
          user: 'Hi,Guest ',
          logout: 'Log in',
          results: results
        });
      }
    } else {
      res.render('user/search', {
        results: ''
      });
    }
  });
}

function description(req, res, type, name, id) {
  models.foodItemsModel.getItem(id).then(function(result) {
    if (result != null) {
      if (type === 'user') {
        var name = "Hi," + req.cookies.name + " ";
        res.render('user/description', {
          user: name,
          logout: 'Log out',
          result: result
        });
      } else if (type === 'admin') {
        res.render('user/description', {
          user: 'ADMIN ',
          logout: 'Log out',
          result: result
        });
      } else {
        res.render('user/description', {
          user: 'Hi,Guest ',
          logout: 'Log in',
          result: result
        });
      }
    } else {
      res.render('user/description', {
        result: ''
      });
    }
  });
}

function loadAllItems(req, res) {
  models.foodItemsModel.getAll().then(function(allItems) {
    if (allItems != null) {
      if (req.cookies.token === 'admin') {
        res.render('admin/allItems', {
          items: allItems
        });
      } else {
        res.send('access denied');
      }
    } else {
      res.send('some error occured');
    }
  });
}

function deleteItem(req, res, id) {
  models.foodItemsModel.remove(id).then(function(effect) {
    if (effect != null) {
      loadAllItems(req, res);
    }
  });
}

function editItem(req, res) {
  var id = req.params.id;
  models.foodItemsModel.getItem(id).then(function(result) {
    if (result != null) {
      res.render('admin/editItem', {
        item: result,
        itemNameMsg: '',
        costMsg: ''
      });
    }
  });
}

function update(req, res) {
  models.foodItemsModel.update(req, function(msg) {
    if (msg === null) {
      res.redirect('/admin/home');
    } else {
      res.render('admin/editItem', {
        item: {
          name: req.body.itemName,
          description: req.body.itemDescription,
          offerDescription: req.body.offerDescription,
          actualCost: req.body.actualCost,
          offerCost: req.body.offerCost
        },
        itemNameMsg: msg.itemNameMsg,
        costMsg: msg.costMsg
      });
    }
  });
}

module.exports = {
  addItem: addItem,
  deleteItem: deleteItem,
  loadHomePage: loadHomePage,
  search: search,
  description: description,
  loadAllItems: loadAllItems,
  editItem: editItem,
  update: update
};