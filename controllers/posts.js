import Post from '../models/Post'

export default { 

  // POST a post
  createPost (request, response, next) {
    let body = request.body
    body.created = Date.now()
    body.edited = Date.now()

    Post
    .create(body)
    .then(dbPost => {
      response
      .status(201)
      .json(dbPost)
    })
    .catch(next)
  },

  // GET all posts
  getPosts (request, response, next) {
    let query = {}
    if(request.query.title) query.title = request.query.title

    Post
    .find(query)
    .populate('author', 'name')
    .then(dbPosts => {
      response.json(dbPosts)
    })
    .catch(next)
  },
  
  // GET a post
  getPost (req, res, next) {
    Post
    .findById(req.params.id)
    .then(post => {
      if(post) {
        res.json(post)
      } else {
        res
        .status(404)
        .send({error: `Post ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  },

  // PUT a post
  updatePost (req, res, next) {
    const id = req.params.id
    let body = req.body
    body.updated = Date.now()

    Post
    .findByIdAndUpdate(id, body)
    .then(post => {
      Post
      .findById(id)
      .then(updatedPost => {
        res.json(updatedPost)
      })
    })
    .catch(next)
  },

  // DELETE a post
  deletePost (req, res, next) {
    Post
    .findByIdAndRemove(req.params.id)
    .then(post => {
      if(post) {
        res.json(post)
      } else {
        res
        .status(404)
        .send({error: `Post ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  }

}