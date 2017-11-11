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
      maxlength: [100, 'Minimum email length is 100'],
      validate: [
        Validators.isEmail,
        Validators.isTaken('email')
      ]
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
      minlength: [6, 'Minimum password length is 6'],
      maxlength: [30, 'Minimum password length is 30']
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

// bcrypt.genSalt(10).then(salt => {
//   bcrypt.hash(user.password, salt).then(hash => {
//     user.created = Date.now()
//     user.edited = Date.now()
//     user.password = hash
//   })
// }).catch(err => next())


// Bcrypt User password
UserSchema.pre('save', function(next) {
  let user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(user.password, salt).then(hash => {
      user.created = Date.now();
      user.edited = Date.now();
      user.password = hash;
      return next();
    })
  }).catch(err => next());
});
// Bcrypt User password
// UserSchema.pre('save', function(next) {
//   let user = this;
//   if(!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//     if(err) return next();
//     bcrypt.hash(user.password, salt, ()=>{}, function(err, hashed) {
//       if(err) return next();
//       user.created = Date.now()
//       user.edited = Date.now()
//       user.password = hashed;
//       return next();
//     });
//   });
// });

// // Schema compare password method
// UserSchema.methods.comparePasswords = function(guess, password, callback) {
//   bcrypt.compare(guess, password, function(err, isMatch) {
//     return callback(err, isMatch);
//   });
// }

export default mongoose.model('User', UserSchema)
