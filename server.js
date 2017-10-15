import express from 'express'
import compression from 'compression'
import mongoose from 'mongoose'
import config from './config/db' 
import bodyParser from 'body-parser'
import routes from './routes/index'

// setup express server
const SERVER = express()

// db connect
mongoose.connect(config.databaseUrl)
mongoose.Promise = global.Promise


// gzip middleware
SERVER.use(compression())

// bodyparser middleware
SERVER.use(bodyParser.json({limit: config.limit}))

// attach routes
SERVER.use('/api', routes)

// error middleware
SERVER.use((err, req, res, next) => {
  res
  .status(422)
  .send({error: err.message})

  next()
})

// 404
SERVER.use((req, res, next) => {
  res
  .status(404)
  .send({error: 'Endpoint not found'})

  next()
})


// listen for requests
SERVER.listen(process.env.port || config.port, () => {
  console.log(`Listening for requests on localhost: ${config.port}`)
});