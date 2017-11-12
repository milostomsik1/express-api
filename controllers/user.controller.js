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
  getUsers (req, res, next) {
    User.find().select('-password')
    .then(doc => {
      res.json(doc)
    })
    .catch(next)
  },


  //-------------------------
  // GET ONE
  //-------------------------
  getUser (req, res, next) {
    User.findById(req.params.id).select('-password')
    .then(user => {
      if(user) {
        res.json(user)
      } else {
        res
        .status(404)
        .send({errors: `User ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  },

  //-------------------------
  // UPDATE
  //-------------------------
  updateUser (req, res, next) {
    req.body.edited = Date.now()
    delete req.body.password

    if (req.body.email) {
      User.findOne({email: req.body.email})
      .then(doc => {
        if (doc) {
          res.status(422).json({errors: {email: "Email already taken"}})
          return
        } else {
          User.findByIdAndUpdate(req.params.id, req.body)
          .then(user => {
            User.findById(req.params.id).select('-password')
            .then(updatedDoc => {
              res.status(200).json(updatedDoc)
            })
          })
          .catch(next)
        }
      })
    }
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
        .send({errors: `User ${req.params.id} doesn't exist.`})
      }
    })
    .catch(next)
  }

}