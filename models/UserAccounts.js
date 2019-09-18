const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true
	},
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	}
});

module.exports = UserAccounts = mongoose.model('useraccounts', UserSchema);
