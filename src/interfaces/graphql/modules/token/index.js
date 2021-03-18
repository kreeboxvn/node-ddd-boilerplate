const resolvers = require('./resolvers')

module.exports = () => {
  const schema = `
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  extend type Query {
      login(email: String!, password: String!): AuthData
  }
`
  return {
    schema: [schema],
    resolvers: resolvers()
  }
}
