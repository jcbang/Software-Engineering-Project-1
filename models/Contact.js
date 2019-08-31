const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
})

module.exports = Contact = mongoose.model('contact', ContactSchema)