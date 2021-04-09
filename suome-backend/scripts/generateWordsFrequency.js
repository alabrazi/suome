// var map = {
//     'hello': {
//         times: 22,
//         topicId: 'xxx'
//     }
// }

const { TopicModel } = require('../models/topic');
const wordsFrequencyMap = {};
const fs = require('fs');
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
	const topics = await TopicModel.find().select('featuredWords wordsFrequency');
	progressTotal = topics.length;

	topics.map(async topic => {
		await mapWordsFrq(topic);
		progressCount++;
		console.log(progressCount, '/', progressTotal);
		if (progressCount === progressTotal) {
			fs.writeFileSync('wordsFrequency.json', JSON.stringify(wordsFrequencyMap), 'utf8');
			console.log('DONE');
		}
	});
}

async function mapWordsFrq(topic) {
	topic.featuredWords.forEach(function(word, index) {
		if (wordsFrequencyMap[word]) {
			if (wordsFrequencyMap[word].times < topic.wordsFrequency[index]) {
				wordsFrequencyMap[word].times = topic.wordsFrequency[index];
				wordsFrequencyMap[word].topicId = topic._id;
			}
		} else {
			wordsFrequencyMap[word] = {
				topicId: topic._id,
				times: topic.wordsFrequency[index]
			};
		}
	});
}
