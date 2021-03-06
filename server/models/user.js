const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  // Save the token into the database and return the token promise.
  return user.save().then(() => {
    // return in promise, another promise will be returned.
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    // Removes all array elements that match a specified query.
    $pull: {
      tokens: {
        token
      }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  // The module;
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    // When querying the nested Object, the name of the field should be wrapped
    // by the single quote.
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// verify the password everytime before the doc being saved.
UserSchema.pre('save', function (next) {
  var user = this;
  // The function is called everytime when each field is updated or saved.
  // console.log('call');
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})


// User
// email - require it - trim it - set type - set min length of 1
var User = mongoose.model('User', UserSchema);

module.exports = {User};
