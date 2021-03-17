const express = require('express')

module.exports = ({ config, router, logger }) => { // eslint-disable-line no-unused-vars
  const app = express()

  app.disable('x-powered-by')
  app.use(router)

  return {
    app,
    start: () =>
      new Promise((resolve) => {
        const http = app.listen(config.port, () => { // eslint-disable-line no-unused-vars
          const { port } = http.address() // eslint-disable-line no-unused-vars
        })
      })
  }
}
