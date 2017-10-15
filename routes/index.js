import express from 'express'
import posts from './posts'
import users from './users'
const routers = express()

routers.use('/v1/posts', posts)
routers.use('/v1/users', users)

export default routers
