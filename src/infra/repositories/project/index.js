const { toEntity } = require('./transform')

module.exports = ({ model: Project }) => {
  const getAll = (...args) =>
    Project.findAll(...args).then(entity =>
      entity.map(data => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args) => {
    {
      console.log('creating project: args ', args)
      return Project.create(...args).then(project => {
        console.log('project created', project)
        return toEntity({...project._doc, ...{user: project.user.toString()}})
      })
    }
  }

  return {
    getAll,
    create
  }
}
