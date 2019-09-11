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
    userProfile: {
        type: String
    }
});

// UserSchema.methods.comparePassword = function(candidatePassword) {
//     // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     //     if (err) return cb(err);
//     //     cb(null, isMatch);
//     // });
//     return candidatePassword === this.password;
// };

module.exports = User = mongoose.model('User', UserSchema)