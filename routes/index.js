import express from 'express'
import posts from './posts'
const routes = express()

// routes.use('/v1/users', users)
routes.use('/v1/posts', posts)

export default routes
