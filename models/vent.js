const {model, Schema} = require('mongoose')

const ventSchema = new Schema({
  title: String,
  body: String,
  mood: Boolean
},{
  timestamps: true
})

module.exports = model('Vent', ventSchema)
