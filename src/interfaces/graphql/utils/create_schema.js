const path = require("path");

module.exports = function createSchema(schemaId) {
  const schemaPath = path.resolve("src/interfaces/graphql/modules", schemaId);
  const schemaProvider = require(schemaPath);

  return schemaProvider();
};
