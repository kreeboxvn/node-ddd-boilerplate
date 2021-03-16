const mongodb = require('src/infra/mongodb')
const schema = require('./models/schema')

module.exports = ({ logger, config }) => {
  if (!config.db) {
    /* eslint-disable no-console */
    logger.error('Database config file log not found, disabling database.')
    /* eslint-enable no-console */
    return false
  }

  return mongodb({ config, basePath: __dirname, schema })
}
