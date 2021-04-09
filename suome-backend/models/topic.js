const Joi = require('joi');
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
	{
		fi: {
			type: String,
			required: true
		},
		en: {
			type: String,
			required: true
		}
	},
	{ _id: false }
);

const quizSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true
		},
		choices: [String],
		answers: [Number]
	},
	{ _id: false }
);

const TopicModel = mongoose.model(
	'Topic',
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 64
		},
		type: {
			type: String,
			enum: ['song', 'video', 'other'],
			required: true
		},
		source: {
			type: String,
			required: true,
			maxlength: 255
		},
		coverImg: {
			type: String,
			required: true,
			maxlength: 255
		},
		description: {
			type: String
		},
		tags: {
			type: [String],
			required: true
		},
		featuredWords: {
			type: [String]
		},
		wordsFrequency: {
			type: [Number]
		},
		totalWords: Number,
		content: {
			type: [contentSchema],
			required: true
		},
		lyricSrc: String,
		quizes: {
			type: [quizSchema]
		},
		study: {
			type: String
		},
		likes: {
			type: Number,
			default: 0
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		replies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Reply'
			}
		],
		removed: {
			type: Boolean,
			default: false
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	})
);

function topicValidator(topic) {
	const schema = {
		title: Joi.string()
			.min(5)
			.max(64)
			.required(),
		type: Joi.required(),
		source: Joi.required(),
		description: Joi.string(),
		coverImg: Joi.required(),
		tags: Joi.array().items(Joi.string()),
		featuredWords: Joi.array().items(Joi.string()),
		content: Joi.array().items(
			Joi.object()
				.keys({
					fi: Joi.string().required(),
					en: Joi.string().required()
				})
				.required()
		),
		quizes: Joi.array().items(
			Joi.object().keys({
				question: Joi.string().required(),
				choices: Joi.array().required(),
				answers: Joi.array().required()
			})
		),
		likes: Joi.number(),
		replyId: Joi.objectId(),
		study: Joi.string(),
		lyricSrc: Joi.string(),
		wordsFrequency: Joi.array().items(Joi.number()),
		totalWords: Joi.number(),
		removed: Joi.boolean()
	};

	return Joi.validate(topic, schema);
}

exports.TopicModel = TopicModel;
exports.topicValidator = topicValidator;
