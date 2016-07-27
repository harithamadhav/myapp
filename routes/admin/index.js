var express = require('express');
var router = express.Router();
var home = require('./home');
var addBurger = require('./addBurger');
var addStarter = require('./addStarter');
var addDrink = require('./addDrink');

router.use('/addBurger', addBurger);
router.use('/addStarter', addStarter);
router.use('/addDrink', addDrink);
router.use('/home', home);


module.exports = router;