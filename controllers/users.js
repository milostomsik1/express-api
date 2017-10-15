import User from '../models/User'

export default { 

  // POST a User
  createUser (request, response, next) {
    const BODY = request.body
    BODY.created = Date.now()
    BODY.edited = Date.now()

    //Checks if already exists
    User
    .findOne({email: request.body.email})
    .then(user => {
      if(user) {
        response
        .status(418)
        .json({error: "Email is taken."})
      } else {
        //Creates user
        User
        .create(BODY)
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