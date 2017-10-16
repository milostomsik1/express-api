import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
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
    maxlength: [100, 'Minimum email length is 100']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
    // minlength: [6, 'Minimum password length is 6'],
    // maxlength: [30, 'Minimum password length is 30']
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
{ versionKey: false })

export default mongoose.model('User', UserSchema)
