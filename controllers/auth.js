import User from '../models/User'
import jwt from 'jsonwebtoken'

export default { 

  // POST a post
  login (request, response, next) {
    const USER = {
      email: 'test@test.com',
      password: '123123'
    }

    const TOKEN = jwt.sign(USER, process.env.SECRET_KEY, {expiresIn: 1440});

    response.json(TOKEN);
  }
}