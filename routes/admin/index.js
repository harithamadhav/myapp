var express = require('express');
var router = express.Router();
var home = require('./home');
var addItem = require('./addItem');

router.use('/addItem', addItem);
router.use('/home', home);


module.exports = router;