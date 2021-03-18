const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Project = t.struct({
  id: t.maybe(t.String),
  title: t.String,
  name: t.String,
  type: t.String,
  user: t.String
})

module.exports = compose(cleanData, Project)
