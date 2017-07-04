var systemPay = require('./systemPay');
var SP = new systemPay();
//console.log(SP);
var dateFormat = require('dateformat');

var now = new Date();
	now.setHours(now.getHours()-2)

var args = {
	commonRequest : {
	 submissionDate : dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss'Z'")
	},
	cardRequest:{
		number:4970100000000003,
		scheme:"VISA",
		expiryMonth:13,
		expiryYear:2023,
		cardSecurityCode:123
	},
	customerRequest:{
		billingDetails:{
			email:"chicoo2006@gmail.com"
		},
		extraDetails:{
			sendMail:1,
			ipAddress:"127.0.0.1"
		}
	}
}
 

SP.execute('createToken', args, function(err,ret,res){
	console.log(err,ret,res);
	//console.log(ret,'ret');

});


