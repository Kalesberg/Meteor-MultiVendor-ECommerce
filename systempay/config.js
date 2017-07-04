var env = process.env;

module.exports = {
	systemPay: {
		shopId:env.shopId,
		url:'https://paiement.systempay.fr/vads-ws/v5?wsdl',
		cert:env.cert,
		mode:env != 'production' ? 'TEST' : 'PRODUCTION'
	}
}