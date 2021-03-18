const container = require('src/container') // we have to get the DI
const { create } = require('src/app/user')

module.exports = () => {
  const {
    repository: { userRepository }
  } = container.cradle

  const { create: createUser } = create({ userRepository })

  return {
    Mutation: {
      createUser: (root, args) => createUser({ body: args.userInput })
    }
  }
}
