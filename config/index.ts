require('dotenv').load()
import path from 'path'
import fs from 'fs'

interface IConfig {
  env: (string | null),
  db: object
}


function loadDbConfig() {
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV]
  }

  throw new Error('Database is configuration is required')
}

const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV))
const dbConfig = loadDbConfig()
const config: IConfig = Object.assign({
  env: ENV,
  db: dbConfig
}, envConfig)

export default config;