const resolvers = require("./resolvers");

module.exports = () => {
  const schema = `type User {
    _id: ID!
    email: String!
    password: String
  }
  input UserInput {
    email: String!
    password: String!
  }
  extend type Mutation {
    createUser(userInput: UserInput): User
  }
  `;
  return {
    schema: [schema],
    resolvers: resolvers(),
  };
};
