var express = require('express');
var login = require('./login');
var signup = require('./signup');
var home = require('./home');
var search = require('./search');
var description = require('./description');
var orderSummary = require('./orderSummary');
var router = express.Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/home', home);
router.use('/search', search);
router.use('/description', description);
router.use('/orderSummary', orderSummary);

module.exports = router;