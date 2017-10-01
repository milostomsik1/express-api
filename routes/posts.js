import express from 'express'
import Post from '../models/post'
const posts = express.Router()

//total amount of posts
let totalPosts = 0;

function updateTotalPosts() {
  Post
  .count()
  .then(res => totalPosts = res)
}

updateTotalPosts();


// get all posts
posts.get('/', (req, res, next) => {
  const page =  parseInt(req.query.page) || 1
  const perPage = parseInt(req.query.perPage) || 10

  let query = {}

  if(req.query.title) query['title'] = req.query.title

  Post
  .find(query)
  .skip((page * perPage) - perPage)
  .limit(perPage)
  .then(post => {
    res.json({
      data: post,
      total: totalPosts,
      page: page,
      perPage: perPage
    })
  })
  .catch(next)
})

// get a single post by id
posts.get('/:id', (req, res, next) => {
  Post
  .findById(req.params.id)
  .then(post => res.json(post))
  .catch(next)
})

// create a post
posts.post('/', (req, res, next) => {
  Post
  .create(req.body)
  .then(post => {
    console.log(`New post added: ${post._id}\nTitle: ${post.title}\nBody: ${post.body}`)
    updateTotalPosts()
    res.json(post)
  })
  .catch(next)
})

// update a post
posts.put('/:id', (req, res, next) => {
  Post
  .findByIdAndUpdate({_id: req.params.id}, req.body)
  .then(post => {
    Post
    .findById(req.params.id)
    .then(post => res.json(post))
  })
  .catch(next)
})

// delete a post
posts.delete('/:id', (req, res, next) => {
  Post
  .findByIdAndRemove({_id: req.params.id})
  .then(post => res.json(post))
  .catch(next)
})

export default posts;