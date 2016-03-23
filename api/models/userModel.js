const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: String,
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

// Encrypt password before saving User
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Compare salted passwords
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
