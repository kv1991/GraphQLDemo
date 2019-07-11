const config = require('../config')
const mongoose = require('mongoose')

require('./schema/list')

const database = () => {
  mongoose.set('debug', true)
  mongoose.connect(config.dbPath)
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on('error', err => {
    console.log(err)
  })
  mongoose.connection.on('open', async() => {
    console.log(`Connect to MongoDB: ${config.dbPath}`)
  })
}
module.exports = {
  database,
} 

