import express from 'express'
import Post from '../models/post'

export default { 

  createPost (req, res, next) {
    Post
    .create(req.body)
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
  },

  getPosts (req, res, next) {
    Post
    .find()
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
  },
  
  getPost (req, res, next) {
    Post
    .findById(req.params.id)
    .then(post => {
      res.json(post)
    })
    .catch(next)
  },

  updatePost (req, res, next) {
    Post
    .findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
      Post
      .findById(req.params.id)
      .then(updatedPost => {
        res.json(updatedPost)
      })
    })
    .catch(next)
  },

  deletePost (req, res, next) {
    Post
    .findByIdAndRemove(req.params.id)
    .then(post => {
      res.json(post)
    })
    .catch(next)
  }

}