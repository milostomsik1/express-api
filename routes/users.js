import express from 'express'
import controller from '../controllers/users'
const ROUTER = express()

ROUTER.route('/')
     .post(controller.createUser)
     .get(controller.getUsers)

ROUTER.route('/:id')
     .get(controller.getUser)
     .put(controller.updateUser)
     .delete(controller.deleteUser)

export default ROUTER

