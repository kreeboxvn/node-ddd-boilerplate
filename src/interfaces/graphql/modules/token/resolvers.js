const container = require('src/container') // we have to get the DI
const { login: appLogin } = require('src/app/token')

module.exports = () => {
  const {
    repository: { userRepository },
    jwt
  } = container.cradle

  const { login } = appLogin({ userRepository, webToken: jwt })

  return {
    Query: {
      login: (root, args) => login({ body: args })
    }
  }
}
