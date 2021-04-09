var csv = require('csv-parser');
var fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://localhost:27017/suomea',
	{ useNewUrlParser: true },
	err => {
		if (err) throw err;

		console.log('connected success!');

		const Word = mongoose.model('Word', { english: String, finnish: String, rank: Number });

		fs.createReadStream('words.csv')
			.pipe(csv())
			.on('data', async function(data) {
				console.log('data:', data);
				var word = new Word({
					english: data.Word,
					finnish: data.Sana,
					rank: parseInt(data.Rank)
				});
				word.save();
			});
	}
);

// const word = new Word({
// 	english: 'english',
// 	finnish: 'finnish',
// 	rank: 1
// });
// word.save();
