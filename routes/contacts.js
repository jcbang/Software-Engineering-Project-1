const UserProfiles = require('../models/UserProfiles');

// todo: only authenticated users can access
exports.postContactsGetAllContacts = async (req, res) => {
	UserProfiles.find({ userID: req.params.userID })
		.then(contacts => res.json(contacts))
		.catch(err =>
			console.log('Oh no something went wrong in routes/api/contacts.js at router.get()!')
		);
};

// todo: only authenticated users can access
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

exports.postContactsDelete = async (req, res) => {
	UserProfiles.findById(req.params.id)
		.then(contact => contact.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false, error: err })); // Return a 404 if you try to delete an item that doesnt exist
};

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
