const mongoose = require('mongoose');
const Joi = require('joi');

const ReplySchema = mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255
	},
	parentTopic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic'
	},
	parentReply: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reply'
	},
	subReplies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reply'
		}
	],
	votes: {
		type: Number,
		default: 0
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

const ReplyModel = mongoose.model('Reply', ReplySchema);

function replyValidator(reply) {
	const schema = {
		content: Joi.string()
			.min(1)
			.max(255)
			.required(),
		type: Joi.string()
			.regex(/^topic$|^reply$/)
			.required(),
		id: Joi.objectId().required(),
		topicId: Joi.objectId(),
		toUser: Joi.objectId()
	};

	return Joi.validate(reply, schema);
}

exports.ReplySchema = ReplySchema;
exports.ReplyModel = ReplyModel;
exports.replyValidator = replyValidator;
exports.populateReplyOpts = [
	{
		path: 'replies',
		populate: {
			path: 'owner',
			select: '_id facebookId username avatar name'
		}
	},
	{
		path: 'owner',
		select: '_id facebookId username avatar name'
	}
];
exports.populateSubReplyOpts = [
	{
		path: 'subReplies',
		populate: {
			path: 'owner',
			select: '_id facebookId username avatar name'
		}
	},
	{
		path: 'owner',
		select: '_id facebookId username avatar name'
	}
];
