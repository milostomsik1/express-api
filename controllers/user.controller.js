import User from '../models/user.model'
import bcrypt from 'bcryptjs'

export default {

  //-------------------------
  // POST
  //-------------------------
  async createUser (req, res, next) {
    let doc = await User.create(req.body).catch(next)
    doc = doc.toObject()
    delete doc.password
    res.status(201).json(doc)
  },


  //-------------------------
  // GET ALL
  //-------------------------
  async getUsers (req, res, next) {
    const doc = await User.find().select('-password').catch(next)
    res.status(200).json(doc)
  },


  //-------------------------
  // GET ONE
  //-------------------------
  async getUser (req, res, next) {
    const doc = await User.findById(req.params.id).select('-password').catch(next)
    if(doc) {
      res.status(200).json(doc)
    } else {
      res.status(404).send({errors: `User ${req.params.id} doesn't exist.`})
    }
  },

  //-------------------------
  // UPDATE
  //-------------------------
  async updateUser (req, res, next) {
    let doc = await User.findByIdAndUpdate(req.params.id, req.body).catch(next)
    if (!doc) {
      next()
      return
    }
    let updDoc = await User.findById(req.params.id).catch(next)
    updDoc = updDoc.toObject()
    updDoc.passwordChanged = doc.password !== updDoc.password
    delete updDoc.password
    res.status(200).json(updDoc)
  },

  //-------------------------
  // DELETE
  //-------------------------
  async deleteUser (req, res, next) {
    const doc = await User.findByIdAndRemove(req.params.id).catch(next)
    if(doc) {
      res.json({message: `Deleted user  ${req.params.id} from DB`})
    } else {
      res
      .status(404)
      .send({errors: `User ${req.params.id} doesn't exist in DB`})
    }
  }

}