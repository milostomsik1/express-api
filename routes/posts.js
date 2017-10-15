import express from 'express'
import controller from '../controllers/posts'
const router = express()

router.route('/')
     .post(controller.createPost)
     .get(controller.getPosts)

router.route('/:id')
     .get(controller.getPost)
     .put(controller.updatePost)
     .delete(controller.deletePost)

export default router
