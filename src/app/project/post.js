/**
 * this file will hold all the get use-case for project domain
 */
const { Project } = require('src/domain/project')

/**
 * function for getter company.
 */
module.exports = ({ projectRepository }) => {
  // code for getting all the items
  const create = ({ body, context }) => {
    return Promise.resolve()
      .then(() => {
        console.log('creating project: context ', context)
        console.log('creating project: body ', body)

        if (!context || !context.user) {
          throw new Error('Unauthenticated!')
        }

        const project = Project({ ...body, user: context.user.id })
        return projectRepository.create(project)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
