/**
 * this file will hold all the get use-case for user domain
 */
const bcrypt = require("bcryptjs");
const { User } = require("src/domain/user");
/**
 * function for getter user.
 */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const create = async (root, args) => {
    try {
      const existingUser = await userRepository.findOne({
        email: args.userInput.email,
      });

      if (existingUser) {
        throw new Error("User exists already.");
      }

      const password = args.userInput.password || "test";
      const hashedPassword = await bcrypt.hash(password, 12);

      const entity = Object.assign({}, args.userInput, {
        password: hashedPassword,
      });
      const user = User(entity);
      return userRepository.create(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    create,
  };
};
