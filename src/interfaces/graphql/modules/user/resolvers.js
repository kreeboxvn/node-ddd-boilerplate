const container = require('src/container') // we have to get the DI
const { create } = require('src/app/user')

module.exports = () => {
  const {
    repository: { userRepository }
  } = container.cradle

  const createUser = create({ userRepository })

  return {
    Mutation: { createUser: createUser.create }
  }
}
