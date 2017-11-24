import express from 'express'
import post from '../controllers/post.controller'
const route = express()


route.post('/', post.create)
route.get('/', post.get)

route.get('/:id', post.getOne)
route.put('/:id', post.update)
route.delete('/:id', post.delete)


export default route
