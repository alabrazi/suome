const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
	english: {
		type: String,
		required: true,
		index: true
	},
	finnish: {
		type: String,
		required: true,
		index: true
	},
	topics: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Topic'
		}
	],
	mostRepeats: Number,
	done: Boolean,
	description: String,
	rank: Number // 1 ... 9999, the lower the more frequency in the language
});

const WordModel = mongoose.model('Word', wordSchema);

exports.WordModel = WordModel;
exports.WordSchema = wordSchema;
