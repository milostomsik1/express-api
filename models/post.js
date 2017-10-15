import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Name field required']
  },
  body: {
    type: String,
    required: [true, 'Body is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required']
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

export default mongoose.model('Post', PostSchema)
