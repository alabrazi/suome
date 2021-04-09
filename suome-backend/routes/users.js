const { UserModel, userValidator, wordValidator } = require('../models/user');
const { WordModel } = require('../models/word');
const { NotificationModel } = require('../models/notification');
const { TopicModel } = require('../models/topic');
const pagination = require('../middleware/pagination');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
	const users = await UserModel.find().select('_id facebookId avatar name isAdmin');
	res.send(users);
});

router.get('/me', auth, async (req, res) => {
	const user = await UserModel.findById(req.user._id);
	if (!user) return res.status(404).send('User not found, please re-login');
	const unread = await NotificationModel.countDocuments({
		to: req.user._id,
		read: false
	});
	user.unread = unread;
	res.send(user);
});

router.get('/mywords', auth, async (req, res) => {
	const words = await getUserWords(req, res);
	res.send(words);
});

router.get('/tags/:topicId', auth, async (req, res) => {
	const topic = await TopicModel.findById(req.params.topicId);
	const words = await getUserWords(req, res);
	const results = diff(topic.featuredWords, words);
	res.send(results);
});

router.post('/mywords', [auth, validate(wordValidator)], async (req, res) => {
	const user = await UserModel.findById(req.user._id);

	if (user.words.indexOf(req.body.english) === -1) {
		user.words.push(req.body.english);
		console.log(user);
		await user.save();
		res.send('ok');
	} else {
		res.send('Aleady exists');
	}
});

router.get('/myprogress', [auth, pagination], async (req, res) => {
	const words = await getUserWords(req, res);
	const allWords = await WordModel.find()
		.select('english')
		.sort({ rank: 1 })
		.skip(req.pagination.skip)
		.limit(req.pagination.limit);

	const progress = allWords.map(word => {
		if (words.indexOf(word.english) !== -1) {
			word.done = true;
		}
		return word;
	});

	res.send(progress);
});

router.get('/:id', auth, async (req, res) => {
	const users = await UserModel.findById(req.params.id);
	res.send(users);
});

router.post('/', [auth, admin, validate(userValidator)], async (req, res) => {
	const user = new UserModel({
		name: req.body.name,
		facebookId: req.body.facebookId,
		email: req.body.email,
		avatar: req.body.avatar
	});
	await user.save();

	res.send(user);
});

router.put('/me', [auth, validate(userValidator)], async (req, res) => {
	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{
			...req.body,
			updatedAt: new Date()
		},
		{ new: true }
	);

	if (!user) return res.status(404).send('The user with the given ID was not found.');

	res.send(user);
});

async function getUserWords(req, res) {
	const user = await UserModel.findById(req.user._id)
		.select('completed words')
		.populate({
			path: 'completed',
			select: 'featuredWords'
		});
	if (!user) return res.status(404).send('User not found, please re-login');
	return flatUserWords(user);
}

function flatUserWords({ completed, words }) {
	const featuredWords = completed.reduce((acc, { featuredWords }) => {
		return acc.concat(featuredWords);
	}, []);

	const allWords = featuredWords.concat(words);
	return allWords.filter((value, idx, self) => {
		return self.indexOf(value) === idx;
	});
}

function diff(A, B) {
	return A.filter(function(a) {
		return B.indexOf(a) == -1;
	});
}

module.exports = router;
