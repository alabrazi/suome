const express = require('express');
const passport = require('passport');
const config = require('config');
const { UserModel, generateUsername } = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/me', (req, res) => {
	console.log(req.user);
	res.send(req.user);
});

router.get('/facebook', passport.authenticate('facebook'));

router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/error',
		session: false
	}),
	async (req, res) => {
		const username = await generateUsername(req.user.name);
		const user = await UserModel.findOneAndUpdate(
			{
				facebookId: req.user.id
			},
			{
				$set: {
					name: req.user.name,
					avatar: `http://graph.facebook.com/${req.user.id}/picture`
				},
				$setOnInsert: {
					facebookId: req.user.id,
					username: username
				}
			},
			{
				upsert: true,
				new: true
			}
		);

		const token = jwt.sign({ _id: user._id, facebookId: req.user.id, username: username }, config.get('jwtPrivateKey'));
		res.redirect(301, `${config.get('FE_URL')}?token=${token}`);
	}
);

module.exports = router;
