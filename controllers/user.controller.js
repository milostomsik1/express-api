import User from '../models/user.model'
import bcrypt from 'bcryptjs'

export default {

  // -- POST
  async create (req, res, next) {
    let doc = await User.create(req.body).catch(next)
    if (doc) {
      doc = doc.toObject()
      delete doc.password
      res.status(201).json(doc)
    }
    !doc && next()
  },

  // -- GET ALL
  async get (req, res, next) {
    const DOC = await User.find().select('-password').catch(next)
    DOC && res.status(200).json(DOC)
    !DOC && next()
  },

  // -- GET ONE
  async getOne (req, res, next) {
    const DOC = await User.findById(req.params.id).select('-password').catch(next)
    DOC && res.status(200).json(DOC)
    !DOC && next()
  },

  // -- UPDATE
  async update (req, res, next) {
    let DOC = await User.findByIdAndUpdate(req.params.id, req.body).catch(next)
    if (DOC) {
      let updDoc = await User.findById(req.params.id).catch(next)
      if (updDoc) {
        updDoc = updDoc.toObject()
        updDoc.passwordChanged = DOC.password !== updDoc.password
        delete updDoc.password
        res.status(200).json(updDoc)
      }
    }
    !DOC && next()
  },

  // -- DELETE
  async delete (req, res, next) {
    const DOC = await User.findByIdAndRemove(req.params.id).catch(next)
    DOC && res.status(200).json({message: `Deleted user ${req.params.id} from DB`})
    !DOC && next()
  }

}