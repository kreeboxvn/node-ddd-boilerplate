const { createContainer, asValue, asFunction } = require('awilix')
// you can do this
const app = require('./app')
// const server = require("./interfaces/http/server");
// const router = require("./interfaces/http/router");
// const auth = require("./interfaces/http/auth");
const server = require('./interfaces/graphql/server')
const router = require('./interfaces/graphql/router')
const auth = require('./interfaces/graphql/auth')
const config = require('../config')
const logger = require('./infra/logging/logger')
// const database = require("./infra/database");
const database = require('./infra/database-mongodb')
const jwt = require('./infra/jwt')
const response = require('./infra/support/response')
const date = require('./infra/support/date')
const repository = require('./infra/repositories')

const container = createContainer()

// SYSTEM
container.register({
  app: asFunction(app).singleton(),
  server: asFunction(server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  database: asFunction(database).singleton(),
  auth: asFunction(auth).singleton(),
  jwt: asFunction(jwt).singleton(),
  response: asFunction(response).singleton(),
  date: asFunction(date).singleton(),
  config: asValue(config),
  repository: asFunction(repository).singleton()
})

module.exports = container
