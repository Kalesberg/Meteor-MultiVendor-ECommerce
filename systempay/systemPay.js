var uuid = require('uuid');
var soap = require('soap');
var crypto = require('crypto');
var dateFormat = require('dateformat');

var config = require('./config');

var systemPay = function(){
	var now = new Date();
	now.setHours(now.getHours()-2)
	this.shopId = config.systemPay.shopId;
	this.cert = config.systemPay.cert;
	this.url = config.systemPay.url;
	this.mode = config.systemPay.mode;
	this.timestamp = dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss'Z'");
	this.requestId = uuid.v4();
}

systemPay.prototype.execute = function(fname, args, cb){
  var systemPay = this;
  soap.createClient(systemPay.url, {
	ignoreBaseNameSpaces : true
	}, function(err, client) {
      if(err){
      	return cb(err);
      }
      //console.dir(client.describe()['v5'].PaymentAPIImplPort.createToken);
		var code = crypto.createHmac("sha256", systemPay.cert).update(systemPay.requestId+''+systemPay.timestamp).digest("base64");
    	console.log(code);

      client.addSoapHeader({
      	shopId:systemPay.shopId,
      	requestId:systemPay.requestId,
      	timestamp:systemPay.timestamp,
      	mode:systemPay.mode,
      	authToken:code,
      });
      console.log(client.soapHeaders);
      client[fname](args, function(err, result, raw, soapHeader) {
      	if(err){
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log('ERROR')
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log(err.body);
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log('ERROR')
      		console.log('////////////////')
      		console.log('////////////////')
      		console.log('////////////////')
      	}else{
      		console.log(result,raw,soapHeader)
      	}
      });

  });
}
module.exports = systemPay;