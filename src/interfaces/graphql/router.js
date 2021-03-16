const statusMonitor = require('express-status-monitor')
const cors = require('cors')
const compression = require('compression')

const { Router } = require('express')
const { partialRight } = require('ramda')

const httpLogger = require('./middlewares/http_logger')
const errorHandler = require('./middlewares/error_handler')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./modules')

module.exports = ({ config, logger, database }) => {
  const router = Router()

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(httpLogger(logger))
  }

  const graphqlRouter = graphqlHTTP({
    schema: schema(),
    graphiql: {
      headerEditorEnabled: true
    }
  })

  const apiRouter = Router()

  apiRouter
    .use(
      cors({
        allowedHeaders: ['Content-Type', 'Authentication']
      })
    )
    .use(compression())
    .use('/', graphqlRouter)

  router.use('/graphql', apiRouter)

  router.use(partialRight(errorHandler, [logger, config]))

  return router
}
