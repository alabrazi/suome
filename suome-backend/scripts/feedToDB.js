const songs = require('./treatedSong500.json');
const mongoose = require('mongoose');

let total = songs.length;
let num = 0;

async function fakeRequest(song) {
	console.log('exec');
	var topic = new Topic({
		title: song.title,
		type: song.type,
		source: song.source,
		description: song.description,
		coverImg: song.coverImg,
		tags: song.tags,
		content: song.content,
		featuredWords: song.featuredWords[0],
		wordsFrequency: song.wordsFrequency[0],
		totalWords: song.totalWords,
		lyricSrc: song.lyricSrc,
		removed: true,
		owner: '5b79593e3afe25ff67f34568'
	});

	try {
		const val = await topic.save();
		num++;
		console.log('DONE ===', num, '/', total);
		return val;
	} catch (e) {
		num++;
		console.log('ee===>', e);
	}
}

const Topic = mongoose.model('Topic', {
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
		type: [],
		required: true
	},
	lyricSrc: String,
	quizes: {
		type: []
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
});

mongoose.connect(
	'mongodb://localhost:27017/suomea',
	{ useNewUrlParser: true },
	err => {
		if (err) throw err;

		console.log('connected success!');

		async function processArr(arr) {
			const promises = arr.map(fakeRequest);
			await Promise.all(promises);
			console.log('DONE!');
		}

		processArr(songs);
	}
);
