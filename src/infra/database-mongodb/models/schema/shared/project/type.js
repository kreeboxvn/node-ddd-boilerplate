const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectTypeSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = projectTypeSchema
