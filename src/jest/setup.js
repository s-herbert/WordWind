const path = require("path");
const fs = require("fs");
const { MongoMemoryServer } = require("mongodb-memory-server");

const DB_NAME = "mockdb";
const mongoConfig = {
  mongoDBName: DB_NAME,
  mongoUri: ""
};
const globalConfigPath = path.join(__dirname, "config", "globalConfig.json");

export default async function Setup() {
  this.mongod = createMongoMemoryServer();
  startMongo(this.mongod);
  mongoConfig.mongoUri = await mongod.getConnectionString();
  writeMongoConfig(mongoConfig, globalConfigPath);
  //reference to db for teardown
  createGlobalDbReference(this.mongod);
}

export const createMongoMemoryServer = () =>
  new MongoMemoryServer({ autoStart: false });

export const startMongo = async mongod => {
  if (!mongod.isRunning) {
    mongod.isRunning = await mongod.start();
  }
  return mongod.isRunning;
};

export const writeMongoConfig = (config, path) => {
  fs.writeFileSync(path, JSON.stringify(config, null, 2));
  return true;
};

export const createGlobalDbReference = db => {
  global.__MONGOD__ = this.mongod;
  return true;
}
