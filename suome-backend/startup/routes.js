const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users');
const topics = require('../routes/topics');
const replies = require('../routes/replies');
const notifications = require('../routes/notifications');
const words = require('../routes/words');
const error = require('../middleware/error');

module.exports = function(app) {
	app.use(express.json());
	app.use('/api/auth', auth);
	app.use('/api/users', users);
	app.use('/api/topics', topics);
	app.use('/api/replies', replies);
	app.use('/api/notifications', notifications);
	app.use('/api/words', words);
	app.use(error);
};
