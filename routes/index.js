var express = require('express');
var admin = require('./admin');
var user = require('./user');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/user', user);
router.use('/admin', admin);


module.exports = router;