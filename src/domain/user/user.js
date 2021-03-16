const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const User = t.struct({
  id: t.maybe(t.String),
  email: t.String,
  password: t.maybe(t.String)
})

module.exports = compose(cleanData, User)
