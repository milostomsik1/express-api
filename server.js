import express from 'express'
import compression from 'compression'
import mongoose from 'mongoose'
import config from './config/db' 
import bodyParser from 'body-parser'
import routes from './routes/index'

// setup express app
const app = express()


// db connect
mongoose.connect(config.databaseUrl)
mongoose.Promise = global.Promise


// gzip middleware
app.use(compression())

// bodyparser middleware
app.use(bodyParser.json({limit: config.limit}))

// attach routes
app.use('/api', routes)

// 404
app.use((req, res, next) => {
  res.status(404)
     .send({ error: 'Endpoint not found' })
  next();
})

// error middleware
app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.message
  })
  next();
})


// listen for requests
app.listen(process.env.port || config.port, () => {
  console.log(`Listening for requests on localhost: ${config.port}`)
});