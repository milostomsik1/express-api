import express from 'express'
import controller from '../controllers/posts'
const ROUTER = express()

ROUTER.route('/')
     .post(controller.createPost)
     .get(controller.getPosts)

ROUTER.route('/:id')
     .get(controller.getPost)
     .put(controller.updatePost)
     .delete(controller.deletePost)

export default ROUTER
