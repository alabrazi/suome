const mongoose = require('mongoose');
const Joi = require('joi');

const NotificationSchema = mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		index: true,
		ref: 'User'
	},
	type: {
		type: String,
		enum: ['reply', 'topic', 'other'],
		required: true
	},
	action: {
		type: String,
		enum: ['comment', 'at', 'system'],
		required: true
	},
	msg: {
		type: String,
		trim: true,
		maxlength: 128
	},
	ctx: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic',
		required: true
	},
	read: {
		type: Boolean,
		default: false
	},
	createdAt: { type: Date, default: Date.now }
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

function notificationValidator(notification) {
	const schema = {
		type: Joi.string()
			.regex(/^topic$|^reply$|^other$/)
			.required(),
		msg: Joi.string()
			.min(5)
			.max(255)
			.required(),
		action: Joi.string()
			.regex(/^comment$|^at$|^system$/)
			.required(),
		to: Joi.objectId().required(),
		ctx: Joi.objectId().required(),
		topicId: Joi.objectId().required()
	};

	return Joi.validate(notification, schema);
}

exports.NotificationSchema = NotificationSchema;
exports.NotificationModel = NotificationModel;
exports.notificationValidator = notificationValidator;
exports.populateNotificationOpts = [
	{
		path: 'from',
		select: '_id facebookId username avatar name'
	},
	{
		path: 'to',
		select: '_id facebookId username avatar name'
	}
];
