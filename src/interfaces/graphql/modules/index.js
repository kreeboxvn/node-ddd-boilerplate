const { makeExecutableSchema } = require('@graphql-tools/schema')

const { merge } = require('lodash')
const createSchema = require('../utils/create_schema')

module.exports = () => {
  const { schema: userSchema, resolvers: userResolvers } = createSchema('user')
  const { schema: tokenSchema, resolvers: tokenResolvers } = createSchema(
    'token'
  ) // eslint-disable-line no-unused-vars
  const { schema: projectSchema, resolvers: projectResolvers } = createSchema(
    'project'
  ) // eslint-disable-line no-unused-vars

  const baseSchema = [
    `
    type Query {
        domain: String
    }
    type Mutation {
        domain: String
    }
    schema {
        query: Query,
        mutation: Mutation
    }
    `
  ]

  const schema = [
    ...baseSchema,
    ...userSchema,
    ...tokenSchema,
    ...projectSchema
  ]

  const options = {
    typeDefs: schema,
    resolvers: merge(userResolvers, tokenResolvers, projectResolvers)
  }

  return makeExecutableSchema(options)
}
