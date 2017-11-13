import User from '../models/user.model'
import bcrypt from 'bcryptjs'

export default {

  //-------------------------
  // POST
  //-------------------------
  async createUser (req, res, next) {
    try {
      let doc = await User.create(req.body)
      doc = doc.toObject()
      delete doc.password
      res.status(201).json(doc)
    }
    catch (err) {
      next(err)
    }
  },


  //-------------------------
  // GET ALL
  //-------------------------
  async getUsers (req, res, next) {
    try {
      const doc = await User.find().select('-password')
      res.status(200).json(doc)
    }
    catch (err) {
      next(err)
    }
  },


  //-------------------------
  // GET ONE
  //-------------------------
  async getUser (req, res, next) {
    try {
      const doc = await User.findById(req.params.id).select('-password')
      if(doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).send({errors: `User ${req.params.id} doesn't exist.`})
      }
    }
    catch (err) {
      next(err)
    }
  },

  //-------------------------
  // UPDATE
  //-------------------------
  async updateUser (req, res, next) {
    try {
      let doc = await User.findByIdAndUpdate(req.params.id, req.body)
      if (!doc) {
        next()
        return
      }
      let updDoc = await User.findById(req.params.id)
      updDoc = updDoc.toObject()
      updDoc.passwordChanged = doc.password !== updDoc.password
      delete updDoc.password
      res.status(200).json(updDoc)
    }
    catch (err) {
      next(err)
    }
  },

  //-------------------------
  // DELETE
  //-------------------------
  async deleteUser (req, res, next) {
    try {
      const doc = await User.findByIdAndRemove(req.params.id)
      if(doc) {
        res.json({message: `Deleted user  ${req.params.id} from DB`})
      } else {
        res
        .status(404)
        .send({errors: `User ${req.params.id} doesn't exist in DB`})
      }
    }
    catch (err) {
      console.log(err)
      next(err)
    }
  }

}