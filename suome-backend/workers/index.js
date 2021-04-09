const { NotificationModel } = require('../models/notification');

module.exports = {
	sendNotifications: obj => {
		if (obj.from.toString() === obj.to.toString()) return;

		NotificationModel.create(obj)
			.then(() => {
				console.log('notification sent', obj);
			})
			.catch(e => {
				console.error('notification create failed', e);
			});
	}
};
