const UserAccounts = require('../models/UserAccounts');
const UserProfiles = require('../models/UserProfiles');
const UserSession = require('../models/UserSession');

exports.postUserLogin = async (req, res) => {
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
				userID: user._id,
				sessionID: doc._id
			});
		});
	});
};

exports.postUserRegister = async (req, res) => {
	const { body } = req;
	const {
		password
	} = body;
	let {
		username
	} = body;
	const {
		firstName
	} = body;
	const {
		lastName
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
	if (!firstName) {
		return res.send({
			success: false,
			message: 'Error: firstName cannot be blank.'
		});
	}
	if (!lastName) {
		return res.send({
			success: false,
			message: 'Error: lastName cannot be blank.'
		});
	}
	username = username.toLowerCase();
	username = username.trim();

	UserAccounts.find({
		username: username
	}, (err, previousUsers) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Error: Server error'
			});
		} else if (previousUsers.length > 0) {
			return res.send({
				success: false,
				message: 'Error: Account already exist.'
			});
		}

		// Save the new user
		const newUser = new UserAccounts();
		newUser.username = username;
		newUser.firstName = firstName;
		newUser.lastName = lastName;
		newUser.password = newUser.generateHash(password);

		const id = newUser._id;
		const newUserProfile = new UserProfiles({
			_id: id
		});

		newUserProfile
			.save()
			.then(doc => console.log('SUCCESSFULLY CREATED A NEW USER PROFILE'));

		newUser.save((err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			}
			return res.send({
				success: true,
				message: 'Signed up'
			});
		});
	});
};

exports.postUserLogout = async (req, res) => {
	// Get the token
	const { query } = req;
	const { sessionID
	} = query;
	// ?sessionID=test
	// Verify the sessionID is one of a kind and it's not deleted.
	UserSession.findOneAndUpdate({
		_id: sessionID,
		isDeleted: false
	}, {
		$set: {
			isDeleted:true
		}
	}, null, (err, sessions) => {
		if (err) {
			console.log(err);
			return res.send({
				success: false,
				message: 'Error: Server error'
			});
		}
		return res.send({
			success: true,
			message: 'Good'
		});
	});
};
