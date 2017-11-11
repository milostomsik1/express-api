import express from 'express'
import controller from '../controllers/auth.controller'
const router = express()

router.route('/login')
      .post(controller.login)

// router.route('/register')
//       .post(controller.register)

export default router