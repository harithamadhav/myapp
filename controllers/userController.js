var users = require('../models');
function registration(req, res){
  var body = req.body;
  console.log(body);
  users.usersModel.insert(body).then( function(data) {
    console.log("is this it????",data);
    res.render('user/signup',{
      firstNameMsg : data.firstNameMsg,
      lastNameMsg : data.lastNameMsg,
      emailMsg : data.emailMsg,
      passwordMsg : data.passwordMsg,
      confirmPasswordMsg : data.confirmPasswordMsg,
      phoneMsg : data.phoneMsg,
      addressMsg : data.addressMsg
    });
    console.log("done");
  }, function(e) {
    console.log(e);
    /*res.render('user/signup',{ 
      firstNameMsg : '',
      lastNameMsg : '',
      emailMsg : '',
      passwordMsg : '',
      confirmPasswordMsg : '',
      phoneMsg : '',
      addressMsg : ''
    });*/
  });
}

module.exports = { registration : registration}; 