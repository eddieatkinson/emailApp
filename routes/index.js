var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config.js')

var transport = {
	host: 'smtp.gmail.com',
	auth: config.auth
}

var transporter = nodemailer.createTransport(transport);
transporter.verify((error, success)=>{
	if(error){
		console.log(error);
	}else{
		console.log('Server is ready to take messages');
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var message = '';
  if(req.query.msg != undefined){
  	message = req.query.msg;
  	res.render('index', {
  		message: message
  	});
  }else{
  	res.render('index', {
  		message:message
  	});
  }
});

router.post('/send', (req, res)=>{
	var { email, message, name, phone } = req.body;
	// var message = req.body.message,
	// 	name = req.body.name,
	// 	phone = req.body.phone,
		finalMessage = `${message} \n\n name: ${name} \n phone: ${phone} \n email: ${email}`

	var mail = {
		from: 'Your website!',
		to: 'eddiebatkinson@gmail.com',
		subject: name,
		text: finalMessage
	}

	transporter.sendMail(mail, (err, data)=>{
		if(err){
			console.log(err);
			res.redirect('/?msg=fail');
		}else{
			console.log("SUCCESSSSS!Š");
			res.redirect('/?msg=success');
		}
	});
});

module.exports = router;
