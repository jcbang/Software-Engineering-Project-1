const UserAccounts = require('../models/UserAccounts');
const UserProfiles = require('../models/UserProfiles');
const UserSession = require('../models/UserSession');

exports.postLogin = async (req, res) => {
	const { body } = req;
	const {
		password
	} = body;
	let {
		username
	} = body;
	if (!username) {
		return res.send({
			success: false,
			message: 'Error: username cannot be blank.'
		});
	}
	if (!password) {
		return res.send({
			success: false,
			message: 'Error: Password cannot be blank.'
		});
	}
	username = username.toLowerCase();
	username = username.trim();
	UserAccounts.find({
		username: username
	}, (err, users) => {
		if (err) {
			console.log('err 2:', err);
			return res.send({
				success: false,
				message: 'Error: server error'
			});
		}
		if (users.length != 1) {
			return res.send({
				success: false,
				message: 'Error: Invalid'
			});
		}
		const user = users[0];
		if (!user.validPassword(password)) {
			return res.send({
				success: false,
				message: 'Error: Invalid'
			});
		}
		// Otherwise correct user
		const userSession = new UserSession();
		userSession.userId = user._id;
		userSession.save((err, doc) => {
			if (err) {
				console.log(err);
				return res.send({
					success: false,
					message: 'Error: server error'
				});
			}
			return res.send({
				success: true,
				message: 'Valid sign in',
				userID: doc._id
			});
		});
	});
};

