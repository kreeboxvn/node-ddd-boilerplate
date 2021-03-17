const Foo = require('./tenant/foo')
const Bar = require('./tenant/bar')
const User = require('./shared/user')
const Project = require('./shared/project')
const ProjectType = require('./shared/project/type')
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
  },
  ProjectType: {
    type: 'shared',
    schema: ProjectType
  }
}
