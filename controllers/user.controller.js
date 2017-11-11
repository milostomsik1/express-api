import User from '../models/user.model'

export default {

  //-------------------------
  // POST
  //-------------------------
  createUser (req, res, next) {
    User.create(req.body)
    .then(doc => {
      doc = doc.toObject()
      delete doc.password
      res.status(201).json(doc)
    })
    .catch(next)
  },

  //-------------------------
  // GET ALL
  //-------------------------
  getUsers (request, response, next) {
    User
    .find()
    .then(dbUsers => {
      response.json(dbUsers)
    })
    .catch(next)
  },


  //-------------------------
  // GET ONE
  //-------------------------
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

  //-------------------------
  // UPDATE
  //-------------------------
  updateUser (req, res, next) {
    const id = req.params.id
    let body = req.body
    body.edited = Date.now()

    User.findByIdAndUpdate(id, body)
    .then(user => {
      User.findById(id)
      .then(updatedUser => {
        res.json(updatedUser)
      })
    })
    .catch(next)
  },

  //-------------------------
  // DELETE
  //-------------------------
  deleteUser (req, res, next) {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
      if(user) {
        res.json(user)
      } else {
        res
        .status(404)
        .send({error: `User ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  }

}