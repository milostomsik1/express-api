import express from 'express'
import posts from './posts'
import users from './users'
const ROUTES = express()

ROUTES.use('/v1/posts', posts)
ROUTES.use('/v1/users', users)

export default ROUTES
