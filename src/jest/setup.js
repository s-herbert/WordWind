const path = require("path");
const fs = require("fs");
const globalConfigPath = path.join(__dirname, "globalConfig.json");
const { MongoMemoryServer } = require("mongodb-memory-server");

const setup = async ()=>{
  this.startMongo();
  const mongoConfig = {
    mongoDBName: "mockdb",
    mongoUri: await mongod.getConnectionString(),
  };
  this.writeMongoConfig();
  
  //reference to db for teardown
  global.__MONGOD__ = this.mongod;
}

setup.mongod = new MongoMemoryServer({
  autoStart: false
});

setup.startMongo = async () =>{
  if(!setup.mongod.isRunning){
    await setup.mongod.start();
  }
}

setup.writeMongoConfig = ()=>{
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  return true;
}





module.exports = setup;
