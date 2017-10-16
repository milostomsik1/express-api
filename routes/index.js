import express from 'express'
import posts from './posts'
import users from './users'
import auth from './auth'
const routers = express()

routers.use('/v1/posts', posts)
routers.use('/v1/users', users)
routers.use('/v1/auth', auth)

export default routers
