import Post from '../models/post.model'
import User from '../models/user.model'

export default {

  // -- POST
  async create (req, res, next) {
    req.body.created = Date.now()
    req.body.edited = Date.now()

    const AUTHOR = await User.findById(req.body.author).catch(next)
    if (!AUTHOR) {
      res.status(422).json({errors: ['Author does not exist.']})
      return
    }

    const DOC = await Post.create(req.body).catch(next)
    DOC && res.status(201).json(DOC)
    !DOC && next()
  },

  // -- GET ALL
  async get (req, res, next) {
    let query = {}
    if(req.query.title) query.title = req.query.title

    const DOC = await Post.find(query).populate('author', 'name').catch(next)
    DOC && res.status(200).json(DOC)
    !DOC && next()
  },

  // -- GET ONE
  async getOne (req, res, next) {
    const DOC = await Post.findById(req.params.id).catch(next)
    DOC && res.status(200).json(DOC)
    !DOC && next()
  },

  // -- UPDATE
  async update (req, res, next) {
    req.body.updated = Date.now()

    const DOC = await Post.findByIdAndUpdate(req.params.id, req.body).catch(next)
    if (DOC) {
      const UPDATED_DOC = await Post.findById(req.params.id).catch(next)
      UPDATED_DOC && res.status(200).json(UPDATED_DOC)
    }
    !DOC && next()
  },

  // -- DELETE
  async delete (req, res, next) {
    const DOC = await Post.findByIdAndRemove(req.params.id).catch(next)
    DOC && res.status(200).json({message: [`Deleted post with id ${req.params.id}`]})
    !DOC && next()
  }

}