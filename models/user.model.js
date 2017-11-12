import mongoose from 'mongoose'
import { Validators } from '../services/validators'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Minimum name length is 100']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minlength: [6, 'Minimum email length is 6'],
      maxlength: [100, 'Maximum email length is 100'],
      validate: [
        Validators.isEmail,
        Validators.isTaken('email')
      ]
    },
    password: {
      type: String,
      // select: false,
      required: [true, 'Password is required'],
      minlength: [6, 'Minimum password length is 6'],
      maxlength: [100, 'Maximum password length is 100']
    },
    created: {
      type: Date,
      default: Date.now()
    },
    edited: {
      type: Date,
      default: Date.now()
    }
  },
  {
    versionKey: false
  }
)

// Encrypt Password on CREATE
UserSchema.pre('save', function(next) {
  const USER = this

  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(USER.password, salt).then(hash => {
      USER.password = hash
      return next()
    })
  }).catch(err => next())
});

// Encrypt Password on UPDATE
UserSchema.pre('update', function(next) {
  const PASSWORD = this._update.$set.password
  if (PASSWORD) {
    bcrypt.genSalt(10).then(salt => {
      bcrypt.hash(PASSWORD, salt).then(hash => {
        this.update({},{ $set: { password: hash } })
        return next()
      })
    }).catch(err => next())
  } else {
    return next()
  }
});

// Schema compare password method
UserSchema.methods.comparePasswords = function(guess, password, callback) {
  bcrypt.compare(guess, password, function(err, isMatch) {
    return callback(err, isMatch);
  });
}

export default mongoose.model('User', UserSchema)
