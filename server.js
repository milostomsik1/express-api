import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import mongoose from 'mongoose'
import config from './config/db'
import bodyParser from 'body-parser'
import routes from './routes/index.routes'

// setup express server
const server = express()
process.env.SECRET_KEY = config.secretKey

// db connect
mongoose.connect(config.databaseUrl)
mongoose.Promise = global.Promise

// logger
server.use(morgan('dev'))

// gzip middleware
server.use(compression())

// bodyparser middleware
server.use(bodyParser.json({limit: config.limit}))

// attach routes
server.use('/api', routes)

// 422 middleware
server.use(function (err, req, res, next) {
  if(err.errors) {
    let errors = {}
    Object.keys(err.errors).forEach(key => {
      errors[key] = (err.errors[key]['message'])
    });
    res.status(422).json({errors})
  } else {
    next()
  }
})

// 500 middleware
server.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({errors: "Internal server error"})
})

// 404 middleware
server.use(function (req, res, next) {
  res.status(404).json({errors: "Endpoint not found"})
})

// listen for requests
server.listen(process.env.port || config.port, () => {
  console.log(`Listening for requests on localhost: ${config.port}`)
});