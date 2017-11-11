import User from '../models/user.model'
import jwt from 'jsonwebtoken'

export default {

  // POST a post
  login (req, res, next) {
    const USER = {
      email: 'test@test.com',
      password: '123123'
    }

    const TOKEN = jwt.sign(USER,process.env.SECRET_KEY, {expiresIn: 1440});

    res.json(TOKEN);
  }
}