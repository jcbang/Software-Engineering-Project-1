const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const ContactSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
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
    address: {
        type: Map,
        of: String
    }
})

module.exports = Contact = mongoose.model('contact', ContactSchema)