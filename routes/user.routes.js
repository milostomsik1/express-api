import express from 'express'
import user from '../controllers/user.controller'
const route = express()


route.post('/', user.create)
route.get('/', user.get)

route.get('/:id', user.getOne)
route.put('/:id', user.update)
route.delete('/:id', user.delete)


export default route

