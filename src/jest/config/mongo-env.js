const path = require("path");
const fs = require("fs");
const NodeEnv = require('jest-environment-node');


const globalConfigPath = path.join(__dirname, "globalConfig.json");

export default class MongoEnv extends NodeEnv{
  constructor (config){
    super(config);
  }

  async setup() {
    console.log('Setup MongoDB Test Environment');
    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));

    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;
    console.log('Awaiting NodeEnv setup..');
    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');
    await super.teardown();
  }
}


// module.exports = MongoEnv