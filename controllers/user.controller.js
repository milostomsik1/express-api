import User from '../models/user.model'
import bcrypt from 'bcryptjs'

export default {

  // -- POST
  async create (req, res, next) {
    let doc = await User.create(req.body).catch(next)
    doc = doc.toObject()
    delete doc.password
    res.status(201).json(doc)
  },

  // -- GET ALL
  async get (req, res, next) {
    const DOC = await User.find().select('-password').catch(next)
    res.status(200).json(DOC)
  },

  // -- GET ONE
  async getOne (req, res, next) {
    const DOC = await User.findById(req.params.id).select('-password').catch(next)
    if(DOC) {
      res.status(200).json(DOC)
    } else {
      res.status(404).send({errors: `User ${req.params.id} doesn't exist.`})
    }
  },

  // -- UPDATE
  async update (req, res, next) {
    let DOC = await User.findByIdAndUpdate(req.params.id, req.body).catch(next)
    if (!DOC) {
      next()
      return
    }
    let updDoc = await User.findById(req.params.id).catch(next)
    updDoc = updDoc.toObject()
    updDoc.passwordChanged = doc.password !== updDoc.password
    delete updDoc.password
    res.status(200).json(updDoc)
  },

  // -- DELETE
  async delete (req, res, next) {
    const DOC = await User.findByIdAndRemove(req.params.id).catch(next)
    if(DOC) {
      res.json({message: `Deleted user  ${req.params.id} from DB`})
    } else {
      res
      .status(404)
      .send({errors: `User ${req.params.id} doesn't exist in DB`})
    }
  }

}