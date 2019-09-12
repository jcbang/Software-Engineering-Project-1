const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserProfilesSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
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

module.exports = UserProfiles = mongoose.model('userprofiles', UserProfilesSchema)