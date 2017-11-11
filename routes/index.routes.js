import express from 'express'
import posts from './post.routes'
import users from './user.routes'
import auth from './auth.routes'

const router = express()

router.use('/posts', posts)
router.use('/users', users)
router.use('/', auth)

export default router
