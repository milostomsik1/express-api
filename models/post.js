import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Name field required']
  },
  body: {
    type: String,
    required: [true, 'Body is required'],
  }
}, 
{ versionKey: false })

export default mongoose.model('Post', PostSchema)
