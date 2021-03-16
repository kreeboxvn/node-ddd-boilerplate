const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const cachedModels = {};

function resolveDb(modelDefinition) {
  if (modelDefinition.type === "shared") {
    return process.env.MAIN_DB;
  }
  return "test" + Math.floor(Math.random() * 10);
}

module.exports = ({ config, basePath, schema }) => {
  const conn = mongoose.createConnection(config.db.url, mongoOptions);

  function connectionFactory(modelName, dbName) {
    const db = conn.useDb(dbName, { useCache: true });
    console.log(`DB switched to ${dbName}`);
    db.model(modelName, schema[modelName].schema);
    return db;
  }
  function modelFactory(modelName) {
    // Get DB for model based on model type and tenantID
    const dbName = resolveDb(schema[modelName]);
    if (!cachedModels[dbName]) {
      cachedModels[dbName] = {};
    }
    if (!cachedModels[dbName] || !cachedModels[dbName][modelName]) {
      console.log(`creating model for ${modelName} at ${dbName}`);
      const connection = connectionFactory(modelName, dbName);
      cachedModels[dbName][modelName] = connection.model(modelName);
    }

    return cachedModels[dbName][modelName];
  }

  const db = {
    conn,
    modelFactory: modelFactory,
  };

  return db;
};
