var express = require('express');
var controller = require('../../controllers')
var router = express.Router();

var multer  = require('multer');
var upload = multer({ 
    storage: multer.diskStorage({

      destination: function (req, file, cb) {
        cb(null, 'public/uploads');
      },
      filename: function (req, file, cb) {
      var ext = require('path').extname(file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
      require('crypto').pseudoRandomBytes(16, function (err, raw) {
        cb(null, (err ? undefined : raw.toString('hex') ) + ext);
      });
    }
  })
});

var uploadtype = upload.single('itemImage');

router.get('/', function(req, res) {
  var type = req.cookies.token;
  if(type === 'admin') {
    res.render('./admin/addItem', {typeMsg : '', itemNameMsg : '', imageMsg : '', costMsg : ''});
  } else {
    res.send('Access denied');
  }
});


router.post('/', uploadtype, controller.foodItemController.addItem);

module.exports = router;