import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config/db' 
import bodyParser from 'body-parser'
import routes from './routes/index'

// setup express server
const server = express()

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

// error middleware
server.use((err, req, res, next) => {
  res
  .status(422)
  .send({error: err.message})

  next()
})

// 404
server.use((req, res, next) => {
  res
  .status(404)
  .send({error: 'Endpoint not found'})

  next()
})


// listen for requests
server.listen(process.env.port || config.port, () => {
  console.log(`Listening for requests on localhost: ${config.port}`)
});