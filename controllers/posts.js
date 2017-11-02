import Post from '../models/Post'

const OPTIONS = {
  title: {
    min: 3,
    max: 100
  },
  body: {
    min: 10,
    max: 1000
  }
}

export default {
  //-------------------------
  // POST
  //-------------------------
  createPost (req, res, next) {
    // --- title
    if (!req.body.title) {
      res.status(422).json({errors: {title: "Title is required."}})
      return;
    } else {
      req.checkBody('title', 'Can\'t be empty.').notEmpty()
      req.checkBody('title', `Must be between ${OPTIONS.title.min} and ${OPTIONS.title.max} characters.`)
        .isLength({min: OPTIONS.title.min, max: OPTIONS.title.max})
    }
    // --- body
    if (!req.body.body) {
      res.status(422).json({errors: {body: "Body is required."}})
      return;
    } else {
    req.checkBody('body', 'Can\'t be empty.').notEmpty()
    req.checkBody('body', `Must be between ${OPTIONS.body.min} and ${OPTIONS.body.max} characters.`)
      .isLength({min: OPTIONS.body.min, max: OPTIONS.body.max})
    }
    // --- author
    if (!req.body.author) {
      res.status(422).json({errors: {author: "Author is required."}})
      return;
    } else {
    req.checkBody('author', 'Must have an author.').notEmpty()
    }

    let errors = req.validationErrors(true)

    if (errors) {
      res.status(422).json({errors})
      return;
    } else {
      req.body.created = Date.now()
      req.body.edited = Date.now()

      Post.create(req.body)
      .then(doc => {
        res.status(201).json(doc)
      })
      .catch(next)
    }
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