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
  async getUsers (req, res, next) {
    const doc = await User.find().select('-password')
    res.status(200).json(doc)
  },


  //-------------------------
  // GET ONE
  //-------------------------
  getUser (req, res, next) {
    User.findById(req.params.id).select('-password')
    .then(user => {
      if(user) {
        res.status(200).json(user)
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
    User.findByIdAndUpdate(req.params.id, req.body).then(doc => {
      if (!doc) {
        next()
        return
      }
      User.findById(req.params.id).then(updDoc => {
        updDoc = updDoc.toObject()
        updDoc.passwordChanged = doc.password !== updDoc.password
        delete updDoc.password
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