import express from 'express'
import posts from './post.routes'
import users from './user.routes'
import auth from './auth.routes'
const route = express()


route.use('/posts', posts)
route.use('/users', users)
route.use('/', auth)


export default route
