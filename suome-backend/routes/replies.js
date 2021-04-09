const { ReplyModel, replyValidator, populateSubReplyOpts } = require('../models/reply');
const { TopicModel } = require('../models/topic');
const worker = require('../workers');
const validate = require('../middleware/validate');
const owner = require('../middleware/owner');
const Fawn = require('fawn');
const { UserModel } = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

async function replyToTopic(req, res) {
	const topic = await TopicModel.findById(req.body.id);
	if (!topic) return res.status(404).send('The topic you are replying to is not found');

	const payload = {
		content: req.body.content,
		owner: req.user._id,
		parentTopic: req.body.id
	};

	try {
		const task = Fawn.Task();
		const results = await task
			.save(ReplyModel, payload)
			.update(TopicModel, { _id: req.body.id }, { $push: { replies: { $ojFuture: '0._id' } } })
			.update(UserModel, { _id: req.user._id }, { $push: { replies: { $ojFuture: '0._id' } } })
			.run({ useMongoose: true });

		// call worker to send notifications
		worker.sendNotifications({
			from: req.user._id,
			to: topic.owner,
			type: 'topic',
			ctx: topic._id,
			topicId: topic._id,
			msg: req.body.content.substring(0, 128),
			action: 'comment'
		});
		res.send(results[0]);
	} catch (ex) {
		res.status(500).send('transaction with reply to topic failed.');
	}
}

async function replyToReply(req, res) {
	const reply = await ReplyModel.findById(req.body.id);
	if (!reply) return res.status(404).send('The message you are replying to is not found');

	const payload = {
		content: req.body.content,
		owner: req.user._id,
		parentReply: req.body.id
	};

	try {
		const task = Fawn.Task();
		const results = await task
			.save(ReplyModel, payload)
			.update(ReplyModel, { _id: req.body.id }, { $push: { subReplies: { $ojFuture: '0._id' } } })
			.update(UserModel, { _id: req.user._id }, { $push: { replies: { $ojFuture: '0._id' } } })
			.run({ useMongoose: true });

		let toUser = reply.owner;
		if (req.body.toUser) toUser = req.body.toUser;

		worker.sendNotifications({
			from: req.user._id,
			to: toUser,
			type: 'reply',
			ctx: reply._id,
			topicId: req.body.topicId,
			msg: req.body.content.substring(0, 128),
			action: 'comment'
		});
		res.send(results[0]);
	} catch (ex) {
		res.status(500).send('transaction with reply to reply failed.');
	}
}

router.post('/', [auth, validate(replyValidator)], async (req, res) => {
	if (req.body.type === 'topic') {
		await replyToTopic(req, res);
	} else {
		await replyToReply(req, res);
	}
});

router.get('/:id', async (req, res) => {
	const reply = await ReplyModel.findById(req.params.id).populate(populateSubReplyOpts);

	res.send(reply);
});

router.put('/:id', [auth, owner(ReplyModel), validate(replyValidator)], async (req, res) => {
	const reply = await ReplyModel.findByIdAndUpdate(
		{
			_id: req.params.id
		},
		req.body,
		{
			upsert: true,
			new: true
		}
	);

	res.send(reply);
});

router.delete('/:id', [auth, owner(ReplyModel)], async (req, res) => {
	const reply = await ReplyModel.findById({
		_id: req.params.id
	});
	if (!reply) return res.status(400).send('reply not exists');
	try {
		const task = Fawn.Task();

		task.remove(ReplyModel, { _id: req.params.id });

		if (reply.parentTopic) {
			task.update(TopicModel, { _id: reply.parentTopic }, { $pull: { replies: req.params.id } });
		}

		if (reply.parentReply) {
			task.update(ReplyModel, { _id: reply.parentReply }, { $pull: { subReplies: req.params.id } });
		}

		await task.run({ useMongoose: true });

		res.send('ok');
	} catch (ex) {
		console.error(ex);
		res.status(500).send('transaction with reply delete failed.');
	}
});

router.post('/:id/upvote', [auth], async (req, res) => {
	const user = await UserModel.findById(req.user._id);

	if (user.upvotes && user.upvotes.indexOf(req.params.id) !== -1)
		return res.status(400).send('You have already upvoted this reply');

	try {
		const task = Fawn.Task();
		const results = await task
			.update(UserModel, { _id: req.user._id }, { $push: { upvotes: req.params.id } })
			.update(ReplyModel, { _id: req.params.id }, { $inc: { votes: 1 } })
			.run({ useMongoose: true });
		res.send('ok');
	} catch (ex) {
		res.status(500).send('transaction with reply upvote failed.');
	}
});

router.post('/:id/downvote', [auth], async (req, res) => {
	const user = await UserModel.findById(req.user._id);

	if (user.downvotes && user.downvotes.indexOf(req.params.id) !== -1)
		return res.status(400).send('You have already downvoted this topic');

	try {
		const task = Fawn.Task();
		const results = await task
			.update(UserModel, { _id: req.user._id }, { $push: { downvotes: req.params.id } })
			.update(ReplyModel, { _id: req.params.id }, { $inc: { votes: -1 } })
			.run({ useMongoose: true });
		res.send('ok');
	} catch (ex) {
		res.status(500).send('transaction with topic downvote failed.');
	}
});

module.exports = router;
