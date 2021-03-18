const User = require('./user')
const Project = require('./project')
// const Company = require("./company");

module.exports = ({ database }) => {
  const userModel = database.modelFactory('User')
  const projectModel = database.modelFactory('Project')
  // const companyModel = database.modelFactory("Companies");

  return {
    userRepository: User({ model: userModel }),
    projectRepository: Project({ model: projectModel })
    // companyRepository: Company({ model: companyModel }),
  }
}
