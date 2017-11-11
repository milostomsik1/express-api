import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Name field required']
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
      minlength: [10, 'Minimum body length: 10'],
      maxlength: [1000, 'Minimum body length: 1000']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
  {
    versionKey: false
  }
)

export default mongoose.model('Post', PostSchema)
