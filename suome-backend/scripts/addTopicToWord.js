const { WordModel } = require('../models/word');
const wordsFrequencyMap = require('./wordsFrequency.json');
let progressCount = 0;
let progressTotal;

const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://localhost:27017/suomea',
	{ useNewUrlParser: true },
	err => {
		if (err) throw err;

		console.log('connected success!');

		start();
	}
);

async function start() {
	console.log('wordsFrequencyMap[i]: ', wordsFrequencyMap['i']);
	const words = await WordModel.find();
	progressTotal = words.length;

	words.map(async word => {
		await saveWithTopic(word);
		progressCount++;
		console.log(progressCount, '/', progressTotal);
		if (progressCount === progressTotal) {
			console.log('DONE');
		}
	});
}

async function saveWithTopic(word) {
	const target = wordsFrequencyMap[word.english];
	if (target) {
		const results = await WordModel.findByIdAndUpdate(word._id, {
			mostRepeats: target.times,
			$set: { topics: [target.topicId] }
		});

		console.log('results', results);
	}
}
