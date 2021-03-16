const { makeExecutableSchema } = require("@graphql-tools/schema");

const { merge } = require("lodash");
const createSchema = require("../utils/create_schema");

module.exports = () => {
  const { schema: userSchema, resolvers: userResolvers } = createSchema("user");
  const { schema: tokenSchema, resolvers: tokenResolvers } = createSchema(
    "token"
  );

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
    `,
  ];

  const schema = [...baseSchema, ...userSchema, ...tokenSchema];

  const options = {
    typeDefs: schema,
    resolvers: merge(userResolvers),
  };

  const executableSchema = makeExecutableSchema(options);

  return executableSchema;
};
