const config = require('config');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

module.exports = app => {
	passport.use(
		new Strategy(
			{
				clientID: config.get('FB_CLIENT_ID'),
				clientSecret: config.get('FB_CLIENT_SECRET'),
				callbackURL: config.get('FB_CB_URL')
			},
			function(accessToken, refreshToken, profile, cb) {
				const { name, id } = profile._json;
				return cb(null, {
					name,
					id
				});
			}
		)
	);

	app.use(passport.initialize());
};
