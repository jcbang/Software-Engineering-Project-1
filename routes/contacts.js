const UserProfiles = require('../models/UserProfiles');

// todo: only authenticated users can access
// All this does is return a JSON object within that object is a list of the contacts
// It returns this list by only filtering contacts from MongoDB with the userID that matches the one of the logged in user
exports.postContactsGetAllContacts = async (req, res) => {
	UserProfiles.find({ userID: req.params.userID })
		.then(contacts => res.json(contacts))
		.catch(err =>
			console.log('Oh no something went wrong in routes/api/contacts.js at router.get()!')
		);
};

// todo: only authenticated users can access
// Make the new contact form match all of this 
// The userID should be passed along under the hood to the API. You won't have the user writing out their ID 
exports.postContactsAdd = async (req, res) => {
	const newContact = new UserProfiles({
		userID: req.params.userID,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone,
		company: req.body.company,
		address: {
			street: req.body.address.street,
			city: req.body.address.city,
			state: req.body.address.state,
			zip: req.body.address.zip
		}
	});

	newContact.save().then(contact => res.json(contact));
};

// This will find a contact by their unique id (everything in the database has a unique id) and deletes them
exports.postContactsDelete = async (req, res) => {
	UserProfiles.findById(req.params.id)
		.then(contact => contact.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false, error: err })); // Return a 404 if you try to delete an item that doesnt exist
};

// This will change the information of already exisiting contacting.
// You just need to return all the contact information back to the API
exports.postContactsUpdate = async (req, res) => {
	UserProfiles.findById(req.params.id, function(error, contact) {
		if (!contact)
			res.status(404).send("Contact is not found.");
		else {
			contact.firstName = req.body.firstName;
			contact.lastName = req.body.lastName;
			contact.phone = req.body.phone;
			contact.company = req.body.company;
			contact.address.street = req.body.address.street;
			contact.address.city = req.body.address.city;
			contact.address.state = req.body.address.state;
			contact.address.zip = req.body.address.zip;
		}
		contact.save().then(newContact => res.json(newContact));
	});

};
