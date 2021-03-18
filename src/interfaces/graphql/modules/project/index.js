const resolvers = require('./resolvers')

module.exports = () => {
  const schema = `
    type Project {
        _id: ID!
        name: String!
        title: String!
        type: String!
        user: User!
    }

    input ProjectInput {
        title: String!
        name: String!
        type: ID!
    }

    extend type Query {
        projects: [Project]!
    }
    
    extend type Mutation {
        createProject(projectInput: ProjectInput): Project
    }
  `
  return {
    schema: [schema],
    resolvers: resolvers()
  }
}
