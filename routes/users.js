import express from 'express'
import controller from '../controllers/users'
const router = express()

router.route('/')
     .post(controller.createUser)
     .get(controller.getUsers)

router.route('/:id')
     .get(controller.getUser)
     .put(controller.updateUser)
     .delete(controller.deleteUser)

export default router

