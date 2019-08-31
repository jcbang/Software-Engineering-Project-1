const express = require('express');
const router = express.Router() 

// Contact model, needed to make queries
const Contact = require('../../models/Contact')

// @route GET api/items
// @desc Get ALL Contacts
// @access Public
router.get('/', (req, res) => {
    // We can use Mongoose to return all Item models from the database. 
    // This returns a promise so we gotta catch 
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => console.log('Oh no something went wrong in routes/api/contacts.js at router.get()!'))
})

// @route POST api/contacts
// @desc Create a contact
// @access Public
router.post('/', (req, res) => {
    const newContact = new Contact({
        firstName: req.body.firstName
    })

    // Saves it to the database
    newContact.save().then(contact => res.json(contact))
})

// @route Delete api/contacts/:id
// @desc Delete an item
// @access Public
router.delete('/:id', (req, res) => {
    // req.params.id fetches it from the URL
    // Also nested promises lol
    Contact.findById(req.params.id)
    .then(contact => contact.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false})) // Return a 404 if you try to delete an item that doesnt exist
})


module.exports = router