var express = require('express');
var router = express.Router();
var home = require('./home');
var addItem = require('./addItem');
var allItems = require('./allItems');
var allOrders = require('./allOrders');
var editItem = require('./editItem');

router.use('/addItem', addItem);
router.use('/home', home);
router.use('/allItems', allItems);
router.use('/allOrders', allOrders);
router.use('/editItem', editItem);

module.exports = router;