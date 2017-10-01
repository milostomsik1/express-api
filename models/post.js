import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema({
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
