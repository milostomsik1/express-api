import User from '../models/User'

export default { 

  // POST a User
  createUser (request, response, next) {
    let _User = request.body
    _User.created = Date.now()
    _User.edited = Date.now()

    User
    .findOne({email: request.body.email})
    .then(user => {
      if(user) {
        response
        .status(418)
        .json({error: "Email is taken."})
        
      } else {
        User
        .create(_User)
        .then(dbUser => {
          response
          .status(201)
          .json(dbUser)
        })
        .catch(next)
      }
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
    .then(User => {
      if(User) {
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
    let _User = req.body
    _User.updated = Date.now()

    User
    .findByIdAndUpdate(id, _User)
    .then(User => {
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
    .then(User => {
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