const { WordModel } = require('../models/word');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	let limit = 500;
	const { top } = req.query;
	if (top) limit = parseInt(top);
	const words = await WordModel.find()
		.select('english finnish')
		.sort({ rank: 1 })
		.limit(limit);
	res.send(words);
});

router.get('/:word', async (req, res) => {
	const word = await WordModel.find({ english: req.params.word });
	if (!word) return res.status(404).send('The word not found.');
	res.send(word);
});

module.exports = router;
