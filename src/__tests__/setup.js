const path = require("path");
const fs = require("fs");
const globalConfigPath = path.join(__dirname, "globalConfig.json");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer({
  autoStart: false
});

module.exports = async () => {
  if(!mongod.isRunning){
    await mongod.start();
  }
  
  //write a config file for mongo
  const mongoConfig = {
    mongoDBName: "mockdb",
    mongoUri: await mongod.getConnectionString()
  };

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  global.__MONGOD__ = mongod;
};
