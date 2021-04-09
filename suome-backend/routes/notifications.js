const { NotificationModel, notificationValidator } = require('../models/notification');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');
const validate = require('../middleware/validate');
const pagination = require('../middleware/pagination');
const express = require('express');
const router = express.Router();

router.get('/', [auth, pagination], async (req, res) => {
	let opts = {
		to: req.user._id
	};
	if (req.query.type) {
		req.query.type === 'read' ? (opts.read = true) : (opts.read = false);
	}

	const notifications = await NotificationModel.find(opts)
		.populate([
			{
				path: 'from',
				select: '_id facebookId username avatar name'
			},
			{
				path: 'topicId',
				select: '_id title'
			}
		])
		.skip(req.pagination.skip)
		.limit(req.pagination.limit)
		.sort({ createdAt: -1 });
	res.send(notifications);
});

router.post('/', [auth, validate(notificationValidator)], async (req, res) => {
	const notification = new NotificationModel({
		...req.body,
		from: req.user._id
	});
	await notification.save();

	res.send(notification);
});

router.post('/:id/read', [auth, owner(NotificationModel)], async (req, res) => {
	const notification = await NotificationModel.findByIdAndUpdate(
		{
			_id: req.params.id
		},
		{ read: true },
		{
			new: true
		}
	);

	res.send(notification);
});

router.delete('/:id', [auth, owner(NotificationModel)], async (req, res) => {
	const notification = await NotificationModel.findByIdAndRemove({
		_id: req.params.id
	});

	res.send(notification);
});

module.exports = router;
