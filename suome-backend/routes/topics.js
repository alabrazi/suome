const { TopicModel, topicValidator } = require('../models/topic');
const validate = require('../middleware/validate');
const pagination = require('../middleware/pagination');
const getAuthUser = require('../middleware/getAuthUser');
const Fawn = require('fawn');
const { UserModel } = require('../models/user');
const { populateReplyOpts } = require('../models/reply');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const config = require('config');

router.get('/', [pagination, getAuthUser], async (req, res) => {
	let queryObj = {};

	if (req.user) {
		if (config.get('admins').indexOf(req.user.facebookId) === -1) {
			queryObj = { removed: false };
		}
	} else {
		queryObj = { removed: false };
	}

	const { total_words } = req.query;
	if (total_words) queryObj = { totalWords: { $lt: parseInt(total_words) } };

	const { tags } = req.query;
	if (tags) queryObj = { tags: { $all: tags.split(',') } };

	const topics = await TopicModel.aggregate()
		.match(queryObj)
		.skip(req.pagination.skip)
		.limit(req.pagination.limit)
		.project({
			tags: 1,
			likes: 1,
			title: 1,
			removed: 1,
			coverImg: 1,
			featuredWords: 1,
			replyCount: { $size: { $ifNull: ['$replies', []] } }
		})
		.sort({ likes: -1 })
		.sort({ 'replies.length': -1 });

	res.send(topics);
});

router.post('/', [auth, admin, validate(topicValidator)], async (req, res) => {
	const topic = new TopicModel({
		...req.body,
		owner: req.user._id
	});
	await topic.save();

	res.send(topic);
});

router.put('/:id', [auth, admin, validate(topicValidator)], async (req, res) => {
	const topic = await TopicModel.findByIdAndUpdate(
		req.params.id,
		{
			...req.body,
			updatedAt: new Date()
		},
		{ new: true }
	);

	if (!topic) return res.status(404).send('The topic with the given ID was not found.');

	res.send(topic);
});

router.get('/:id', async (req, res) => {
	const topic = await TopicModel.findOne({ _id: req.params.id }).populate(populateReplyOpts);

	if (!topic) return res.status(404).send('The topic with the given ID was not found.');

	res.send(topic);
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const topic = await TopicModel.findByIdAndRemove(req.params.id);
	res.send(topic);
});

router.post('/:id/like', [auth], async (req, res) => {
	const user = await UserModel.findById(req.user._id);

	if (user.likes && user.likes.indexOf(req.params.id) !== -1)
		return res.status(400).send('You have already liked this topic');

	try {
		const task = Fawn.Task();
		const results = await task
			.update(UserModel, { _id: req.user._id }, { $push: { likes: req.params.id } })
			.update(TopicModel, { _id: req.params.id }, { $inc: { likes: 1 } })
			.run({ useMongoose: true });
		res.send('ok');
	} catch (ex) {
		res.status(500).send('transaction with topic likes failed.');
	}
});

router.post('/:id/unlike', [auth], async (req, res) => {
	const user = await UserModel.findById(req.user._id);

	if (user.likes.indexOf(req.params.id) === -1) return res.status(400).send('You have not liked this topic yet');

	try {
		const task = Fawn.Task();
		const results = await task
			.update(UserModel, { _id: req.user._id }, { $pull: { likes: req.params.id } })
			.update(TopicModel, { _id: req.params.id }, { $inc: { likes: -1 } })
			.run({ useMongoose: true });
		res.send('ok');
	} catch (ex) {
		res.status(500).send('transaction with topic unlike failed.');
	}
});

router.post('/:id/complete', [auth], async (req, res) => {
	const user = await UserModel.findById(req.user._id);
	const topic = await TopicModel.findById(req.params.id);
	if (!topic) return res.status(404).send('The topic with the given ID was not found.');

	user.completed.push(topic._id);

	await user.save();

	res.send('ok');
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const topic = await TopicModel.findByIdAndUpdate(
		req.params.id,
		{
			removed: false
		},
		{ new: true }
	);
	res.send(topic);
});

module.exports = router;
