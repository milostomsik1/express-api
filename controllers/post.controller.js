import Post from '../models/post.model'

export default {

  // -- POST
  async create (req, res, next) {
    req.body.created = Date.now()
    req.body.edited = Date.now()

    const DOC = await Post.create(req.body).catch(next)
    DOC && res.status(201).json(DOC)
  },

  // -- GET ALL
  async get (req, res, next) {
    let query = {}
    if(req.query.title) query.title = req.query.title

    const DOC = await Post.find(query).populate('author', 'name').catch(next)
    DOC && res.status(200).json(DOC)
  },

  // -- GET ONE
  async getOne (req, res, next) {
    console.log(req.params)
    const DOC = await Post.findById(req.params.id).catch(next)
    if(DOC) {
      res.status(200).json(DOC)
    } else {
      res.status(404).json({
        errors: {post: `${req.params.id} doesn't exist.`}
      })
    }
  },

  // -- UPDATE
  async update (req, res, next) {
    req.body.updated = Date.now()

    const DOC = await Post.findByIdAndUpdate(req.params.id, req.body).catch(next)
    const UPDATED_DOC = await Post.findById(req.params.id).catch(next)
    res.status(200).json(UPDATED_DOC)
  },

  // -- DELETE
  async delete (req, res, next) {
    const DOC = await Post.findByIdAndRemove(req.params.id).catch(next)
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).send({
        errors: {post: `${req.params.id} doesn't exist.`}
      })
    }
  }

}