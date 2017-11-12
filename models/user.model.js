import mongoose from 'mongoose'
import { Validators } from '../services/validators'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Maximum name length is 100']
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
UserSchema.pre('findOneAndUpdate', function(next) {
  this.findOneAndUpdate({},{ edited: Date.now() })

  this.find({}).then(doc => {
    const NEW_PASSWORD = this._update.newPassword
    const PASSWORD = this._update.password
    const HASHED_PASSWORD = doc[0].password

    if (PASSWORD && NEW_PASSWORD && bcrypt.compareSync(PASSWORD, HASHED_PASSWORD)) {
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(NEW_PASSWORD, salt).then(hash => {
          this.findOneAndUpdate({},{ password: hash })
          return next()
        })
      }).catch(err => next())
    } else {
      delete this._update.password
      return next()
    }
  }).catch(err => next())
});

// Schema compare password method
// UserSchema.methods.comparePasswords = function(guess, password, callback) {
//   bcrypt.compare(guess, password, function(err, isMatch) {
//     return callback(err, isMatch);
//   });
// }

UserSchema.methods.comparePasswords = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      if(err) {
          return callback(err);
      }
      callback(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema)
