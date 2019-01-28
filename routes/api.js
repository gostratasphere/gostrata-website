var express = require('express');
var router = express.Router();

var mailDomain = process.env.MAILGUN_URL;
var mailKey = process.env.MAILGUN_KEY;
var mailgun = require('mailgun-js')({apiKey: mailKey, domain: mailDomain});

let message = {
    from: '',
    to: '',
    subject: '',
    text: '',
	};

// let corsOptions = {
//     origin: ["*"],
//     methods: ["POST"],
//     optionsSuccessStatus: 200,
//     allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"]
// 	}


router.post('/webform', function(req, res, next) {

  if (req.body.email != '' && req.body.name != '' && req.body.message != '') {
	  message = {
	    from: req.body.email,
	    to: 'contact@gostratasphere.com',
	    subject: 'A new form submission from ' + req.body.name + ' on gostratasphere.com',
	    text: req.body.message,
		};

		mailgun.messages().send(message, function (error, body) {
	  console.log(body);
	  res.send(error ? error : body);
	  // res.redirect('http://gostratasphere.com');
		});
	} else {
		res.send({error: 'Please fill out all the fields'});
	}


});

module.exports = router;