const mongoose = require('mongoose')
const { encryptPassword } = require('../../../../encryption')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
})

userSchema.pre('save', function(next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  user.password = encryptPassword(user.password)
  return next();
})

module.exports = userSchema
