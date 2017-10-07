import express from 'express'
import Post from '../controllers/posts'
const posts = express()

posts.route('/')
     .post(Post.createPost)
     .get(Post.getPosts)

posts.route('/:id')
     .get(Post.getPost)
     .put(Post.updatePost)
     .delete(Post.deletePost)

export default posts
