const container = require("src/container"); // we have to get the DI
const { login } = require("src/app/token");

module.exports = () => {
  const {
    repository: { userRepository },
  } = container.cradle;

  const createUser = login({ userRepository });

  return {
    Mutation: { createUser },
  };
};
