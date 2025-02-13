/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token')

/**
 * function for getter user.
 */
module.exports = ({ userRepository, webToken }) => {
  // code for getting all the items
  const login = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = Token(body)
        const userCredentials = await userRepository.findOne({
          email: credentials.email
        })
        console.log('logging in...', userCredentials)

        const validatePass = userRepository.validatePassword(
          userCredentials.password
        )

        if (!validatePass(credentials.password)) {
          throw new Error('Invalid Credentials')
        }
        const signIn = webToken.signin()

        resolve({
          token: signIn({
            id: userCredentials.id,
            email: userCredentials.email
          })
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    login
  }
}
