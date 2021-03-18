const statusMonitor = require('express-status-monitor')
const cors = require('cors')
const compression = require('compression')

const { Router } = require('express')
const { partialRight } = require('ramda')

const httpLogger = require('./middlewares/http_logger')
const errorHandler = require('./middlewares/error_handler')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./modules')

module.exports = ({ config, logger, database, auth }) => {
  const router = Router()

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(httpLogger(logger))
  }

  console.log('checking auth:', auth)

  const getUser = (req, res) =>
    new Promise((resolve, reject) => {
      console.log('running getUser')
      auth.authenticate('jwt', { session: false }, (err, user) => {
        console.log('authentication result: ', err, user)
        if (err) reject(err)
        resolve(user)
      })(req, res)
    })

  const graphqlRouter = graphqlHTTP(async (req, res) => {
    const user = await getUser(req, res)
    return {
      schema: schema(),
      graphiql: {
        headerEditorEnabled: true
      },
      context: { user }
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
