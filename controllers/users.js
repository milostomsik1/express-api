import User from '../models/User'
import bcrypt from 'bcryptjs'

export default { 

  // POST a User
  createUser (req, res, next) {
    // --- ADD REQUEST VALIDATION

    User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        res.json({error: 'Email already in use.'})
        return;
      }
      bcrypt.genSalt(5, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          req.body.created = Date.now()
          req.body.edited = Date.now()
          req.body.password = hash;
          
          User.create(req.body)
          .then(dbUser => {
            res.status(201).json(dbUser)
          })
        })
      })
    })
    .catch(next)
  },

  // GET all Users
  getUsers (request, response, next) {
    User
    .find()
    .then(dbUsers => {
      response.json(dbUsers)
    })
    .catch(next)
  },
  
  // GET a User
  getUser (req, res, next) {
    User
    .findById(req.params.id)
    .then(user => {
      if(user) {
        res.json(User)
      } else {
        res
        .status(404)
        .send({error: `User ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  },

  // PUT a User
  updateUser (req, res, next) {
    const id = req.params.id
    let body = req.body
    body.edited = Date.now()

    User
    .findByIdAndUpdate(id, body)
    .then(user => {
      User
      .findById(id)
      .then(updatedUser => {
        res.json(updatedUser)
      })
    })
    .catch(next)
  },

  // DELETE a User
  deleteUser (req, res, next) {
    User
    .findByIdAndRemove(req.params.id)
    .then(user => {
      if(User) {
        res.json(User)
      } else {
        res
        .status(404)
        .send({error: `User ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  }

}