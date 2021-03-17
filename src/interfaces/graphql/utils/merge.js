const DataLoader = require('dataloader')

const modelFactory = require('../../models/model-factory')
const Project = modelFactory('Project')
const ProjectType = modelFactory('ProjectType')
const User = modelFactory('User')

const projectLoader = new DataLoader((projectIds) => {
  return projects(projectIds)
})

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } })
})

const projectTypeLoader = new DataLoader((typeIds) => {
  return ProjectType.find({ _id: { $in: typeIds } })
})

const projects = async (projectIds) => {
  try {
    const projects = await Project.find({ _id: { $in: projectIds } })
    projects.sort((a, b) => {
      return (
        projectIds.indexOf(a._id.toString()) -
        projectIds.indexOf(b._id.toString())
      )
    })
    return projects.map((project) => {
      return transformProject(project)
    })
  } catch (err) {
    throw err
  }
}

const singleProject = async (projectId) => { // eslint-disable-line no-unused-vars
  try {
    return await projectLoader.load(projectId.toString())
  } catch (err) {
    throw err
  }
}

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString())
    return {
      ...user._doc,
      _id: user.id,
      createdProjects: () => projectLoader.loadMany(user._doc.createdProjects)
    }
  } catch (err) {
    throw err
  }
}

const projectType = async (typeId) => {
  try {
    const type = await projectTypeLoader.load(typeId.toString())
    return {
      ...type._doc,
      _id: type.id
    }
  } catch (err) {
    throw err
  }
}

const transformProject = (project) => {
  return {
    ...project._doc,
    _id: project.id,
    user: user.bind(this, project._doc.user),
    type: projectType.bind(this, project._doc.type)
  }
}

exports.transformProject = transformProject
