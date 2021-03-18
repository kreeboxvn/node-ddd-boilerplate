const container = require('src/container') // we have to get the DI
const { post, get } = require('src/app/project')

module.exports = () => {
  const {
    repository: { projectRepository }
  } = container.cradle

  const { create: postProject } = post({ projectRepository })
  const { all } = get({ projectRepository })

  return {
    Query: { projects: (root, args) => all() },
    Mutation: {
      createProject: (root, args, context) =>
        postProject({ body: args.projectInput, context })
    }
  }
}
