var express = require('express');

var user = require('./user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.use('/user', user);


module.exports = router;