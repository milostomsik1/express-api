import Post from '../models/post.model'

export default {

  //-------------------------
  // POST
  //-------------------------
  createPost (req, res, next) {
    req.body.created = Date.now()
    req.body.edited = Date.now()

    Post.create(req.body)
    .then(doc => {
      res.status(201).json(doc)
    })
    .catch(next)
  },

  //-------------------------
  // GET ALL
  //-------------------------
  getPosts (req, res, next) {
    let query = {}
    if(req.query.title) query.title = req.query.title

    Post.find(query).populate('author', 'name')
    .then(doc => {
      res.json(doc)
    })
    .catch(next)
  },

  //-------------------------
  // GET ONE
  //-------------------------
  getPost (req, res, next) {
    Post.findById(req.params.id)
    .then(doc => {
      if(doc) {
        res.json(doc)
      } else {
        res.status(404).send({
          errors: {post: `${req.params.id} doesn't exist.`}
        })
      }
    })
    .catch(next)
  },

  //-------------------------
  // UPDATE
  //-------------------------
  updatePost (req, res, next) {
    const id = req.params.id
    let body = req.body
    body.updated = Date.now()

    Post
    .findByIdAndUpdate(id, body)
    .then(doc => {
      Post.findById(id)
      .then(updatedDoc => {
        res.status(200).json(updatedDoc)
      })
    })
    .catch(next)
  },

  //-------------------------
  // DELETE
  //-------------------------
  deletePost (req, res, next) {
    Post.findByIdAndRemove(req.params.id)
    .then(post => {
      if(post) {
        res.json(post)
      } else {
        res.status(404).send({
          errors: {post: `${req.params.id} doesn't exist.`}
        })
      }
    })
    .catch(next)
  }

}