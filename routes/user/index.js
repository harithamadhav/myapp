var express = require('express');
var login = require('./login');
var signup = require('./signup');
var home = require('./home');
var search = require('./search');
var description = require('./description');
var orderSummary = require('./orderSummary');
var deliveryConfirmation = require('./deliveryConfirmation');
var profile = require('./profile');
var router = express.Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/home', home);
router.use('/search', search);
router.use('/profile', profile);
router.use('/description', description);
router.use('/orderSummary', orderSummary);
router.use('/deliveryConfirmation', deliveryConfirmation);

module.exports = router;