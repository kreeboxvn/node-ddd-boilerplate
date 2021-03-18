/**
 * this file will hold all the get use-case for user domain
 */
const bcrypt = require('bcryptjs')
const { User } = require('src/domain/user')
/**
 * function for getter user.
 */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const create = async ({ body }) => {
    try {
      const existingUser = await userRepository.findOne({
        email: body.email
      })

      if (existingUser) {
        throw new Error('User exists already.')
      }

      const entity = Object.assign({}, body)
      const user = User(entity)
      return userRepository.create(user)
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    create
  }
}
