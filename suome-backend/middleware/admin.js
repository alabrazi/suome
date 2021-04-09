const config = require('config');

module.exports = function(req, res, next) {
	if (config.get('admins').indexOf(req.user.facebookId) !== -1) {
		next();
	} else {
		res.status(401).send('You do not have rights to do so.');
	}
};
