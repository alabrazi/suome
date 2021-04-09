const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 20
	},
	username: {
		type: String,
		required: true,
		index: true
	},
	facebookId: {
		type: String,
		required: true,
		index: true
	},
	facebook: String,
	twitter: String,
	instagram: String,
	description: String,
	email: {
		type: String,
		minlength: 3,
		maxlength: 255
	},
	avatar: String,
	replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reply'
		}
	],
	upvotes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reply'
		}
	],
	downvotes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reply'
		}
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reply'
		}
	],
	completed: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Topic'
		}
	],
	words: {
		type: Array,
		default: []
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	unread: Number
});

const UserModel = mongoose.model('User', userSchema);

function userValidator(user) {
	const schema = {
		name: Joi.string()
			.min(1)
			.max(20),
		facebookId: Joi.string(),
		facebook: Joi.string(),
		email: Joi.string()
			.min(3)
			.max(255)
			.email(),
		avatar: Joi.string(),
		description: Joi.string()
	};

	return Joi.validate(user, schema);
}

function wordValidator(word) {
	const schema = {
		english: Joi.string().required()
	};

	return Joi.validate(word, schema);
}

async function generateUsername(username) {
	username = username
		.trim()
		.replace(/\s/g, '')
		.toLowerCase();
	const exists = await UserModel.findOne({ username: username });

	if (exists) {
		let suffix = Math.floor(Math.random() * 9) + 1;
		username = username + suffix;
		await generateUsername(username);
	}

	return username;
}

exports.UserModel = UserModel;
exports.UserSchema = userSchema;
exports.userValidator = userValidator;
exports.generateUsername = generateUsername;
exports.wordValidator = wordValidator;
