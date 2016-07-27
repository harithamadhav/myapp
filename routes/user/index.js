var express = require('express');
var login = require('./login');
var signup = require('./signup');
var home = require('./home');
var orderSummary = require('./orderSummary');
var router = express.Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/home', home);
router.use('/orderSummary', orderSummary);

module.exports = router;