const helpers = require("./utils/setupHelpers");

const DB_NAME = "mockdb";
const mongoConfig = {
  mongoDBName: DB_NAME,
  mongoUri: ""
};

export default async function Setup() {
  const mongod = helpers.createMongoMemoryServer();
  helpers.startMongo(mongod);
  mongoConfig.mongoUri = await mongod.getConnectionString();
  helpers.writeMongoConfig(helpers.globalConfigPath,mongoConfig);
  helpers.createGlobalDbReference(mongod);  
}
// module.exports = Setup;
