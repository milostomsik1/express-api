import User from '../models/user.model'
import bcrypt from 'bcryptjs'

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
    if (!(req.body.password && req.body.newPassword)) {
      delete req.body.password
      delete req.body.newPassword
    }

    User.findByIdAndUpdate(req.params.id, req.body).then(doc => {
      if (!doc) {
        next()
        return
      }
      User.findById(req.params.id).then(updDoc => {
        res.status(200).json(updDoc)
      })
    }).catch(next)
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