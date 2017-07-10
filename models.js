const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

//model for tracked mood inputs
const MoodSchema = mongoose.Schema({
    description: {type: String, required: true},
    date: {type: Date},
    cause: {type: String},
    duration: {},
    user: { type: mongoose.Schema.Types.ObjectId, 
          ref: 'User',
          required: [true,'No user id found']},
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    moods: [MoodSchema]
});

UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || '',
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
}

const User = mongoose.model('User', UserSchema);
const Mood = mongoose.model('Mood', MoodSchema);

module.exports = {User, Mood};