const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
const Fawn = require('fawn');

Fawn.init(mongoose);

module.exports = function() {
	const db = config.get('db');
	mongoose
		.connect(
			db,
			{ useNewUrlParser: true }
		)
		.then(() => winston.info(`Connected to ${db}...`));
};
