const Foo = require('./tenant/foo')
const Bar = require('./tenant/bar')
const User = require('./shared/user')
const Project = require('./shared/project')
module.exports = {
  Foo: {
    type: 'tenant',
    schema: Foo
  },
  Bar: {
    type: 'tenant',
    schema: Bar
  },
  User: {
    type: 'shared',
    schema: User
  },
  Project: {
    type: 'shared',
    schema: Project
  }
}
