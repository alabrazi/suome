const config = require('config');

module.exports = Model => {
	return async (req, res, next) => {
		if (config.get('admins').indexOf(req.user.facebookId) !== -1) {
			next();
		} else {
			const item = await Model.findById(req.params.id);
			const ownerId = item.owner || item.to;
			if (ownerId.toString() !== req.user._id) {
				return res.status(401).send('you do not have rights to modify this.');
			}
			next();
		}
	};
};
