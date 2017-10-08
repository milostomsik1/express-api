import Post from '../models/post'

export default { 

  createPost (req, res, next) {
    Post
    .create(req.body)
    .then(posts => {
      res
      .status(201)
      .json(posts)
    })
    .catch(next)
  },

  getPosts (req, res, next) {
    Post
    .find()
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
  },
  
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

  updatePost (req, res, next) {
    Post
    .findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
      Post
      .findById(req.params.id)
      .then(updatedPost => {
        res.json(updatedPost)
      })
    })
    .catch(next)
  },

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