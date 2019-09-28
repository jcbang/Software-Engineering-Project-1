const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema aka a template for what goes in the database
const UserProfilesSchema = new Schema({
	userID: {
		type: String,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	phone: {
		type: String
	},
	company: {
		type: String
	},

	// This called map but it is just a regular JavaScript Object
	// You can specify any amount of properties for this Object. 
	// We want the user input form to only allow properties associated with an address
	// example:
	// Street: 123 Stonefield Dr
	// City: Orlando
	// State: Florida
	// Zip: 32826
	// So address.zip prints 32826 
	// All of these values for the object properties are data type string
	address: {
		street: String,
		city: String,
		state: String,
		zip: String

	}
});

// We export this model template for the API to use and communicate with the database
module.exports = UserProfiles = mongoose.model('userprofiles', UserProfilesSchema);
