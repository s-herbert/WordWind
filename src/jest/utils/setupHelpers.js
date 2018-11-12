const { MongoMemoryServer } = require("mongodb-memory-server");
const fs = require("fs");
const path = require("path");

export const globalConfigPath = path.join(__dirname, "../config", "globalConfig.json");

export const createMongoMemoryServer = () =>
  new MongoMemoryServer({ autoStart: false });

export const startMongo = async mongod => {
  if (!mongod.isRunning) {
    mongod.isRunning = await mongod.start();
  }
  return mongod.isRunning;
};

export const writeMongoConfig = (path,config) => {
  fs.writeFileSync(path, JSON.stringify(config, null, 2));
  return true;
};

export const createGlobalDbReference = db => {
  global.__MONGOD__ = db;
  return global.__MONGOD__;
}