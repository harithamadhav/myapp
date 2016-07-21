var express = require('express');
var login = require('./login');
var signup = require('./signup');
var router = express.Router();

router.use('/login', login);
router.use('/signup', signup);

module.exports = router;

