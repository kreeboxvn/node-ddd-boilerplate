// const fs = require('fs')
// const path = require('path')
import mongoose from 'mongoose';
import {Schema, Model, Document} from "mongoose";

enum SCHEMA_TYPE_ENUM {
  SHARED_SCHEMA = 'shared',
  TENANT_SCHEMA = 'tenant',
}

interface ISchemaRecord {
  schema: Schema<any>
  type: SCHEMA_TYPE_ENUM
}

interface ISchemaStorage {
  [modelName: string]: ISchemaRecord
}

interface IDatabaseDependency {
  config: { db: { url: string } };
  basePath: string | null;
  schema: ISchemaStorage
}

interface ICachedModelStorage {
  [dbName: string]: {
    [modelName: string]: Model<Document<any, {}>, {}>
  }
}

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000
}

const cachedModels: ICachedModelStorage = {}

function resolveDb(modelDefinition: ISchemaRecord): string {
  if (modelDefinition.type === SCHEMA_TYPE_ENUM.SHARED_SCHEMA) {
    return process.env.MAIN_DB as string
  }
  return 'test' + Math.floor(Math.random() * 10)
}

module.exports = ({config, basePath, schema}: IDatabaseDependency) => {
  console.log(schema)
  const conn = mongoose.createConnection(config.db.url, mongoOptions)

  function connectionFactory(modelName: string, dbName: string) {
    const db = conn.useDb(dbName, {useCache: true})
    console.log(`DB switched to ${dbName}`)
    db.model(modelName, schema[modelName].schema)
    return db
  }

  function modelFactory(modelName: string, mongooseModel: Model<any>, mongooseDocument: Document<any>) {
    // Get DB for model based on model type and tenantID
    const dbName = resolveDb(schema[modelName])
    if (!cachedModels[dbName]) {
      cachedModels[dbName] = {}
    }
    if (!cachedModels[dbName] || !cachedModels[dbName][modelName]) {
      console.log(`creating model for ${modelName} at ${dbName}`)
      const connection = connectionFactory(modelName, dbName)
      cachedModels[dbName][modelName] = connection.model<typeof mongooseDocument>(modelName);
    }

    return cachedModels[dbName][modelName]
  }

  return {
    conn,
    modelFactory: modelFactory
  }
}
