const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');
	if (typeof token === 'undefined' || token == null || token == 'null') return next();
	if (typeof token !== 'undefined' && (token !== null) && (token !=='null')) {
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = decoded;
		next();	
	}
	
};
