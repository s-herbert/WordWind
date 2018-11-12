import * as setup from "../setup";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as path from "path";
import * as fs from "fs";

const configPath = path.join(__dirname,'config.json');

afterAll(()=>{
  fs.unlinkSync(configPath);
})


describe("setup unit tests", () => {

  it("can create a MongoMemoryServer instance", () => {
    expect(setup.createMongoMemoryServer).toBeDefined();
    const memoryServer = setup.createMongoMemoryServer();
    expect(memoryServer).toBeInstanceOf(MongoMemoryServer);
    expect(memoryServer.runningInstance).toBeUndefined();
  });

  it("can spin up a connection", () => {
    const memoryServer = new MongoMemoryServer({ autoStart: false });
    expect.assertions(3);
    return setup
      .startMongo(memoryServer)
      .then(result => {
        expect(result).toBe(true);
        expect(memoryServer.isRunning).toBe(true);
        expect(memoryServer.stop()).toBeInstanceOf(Promise);
      })
      .catch(err => console.error(err));
  });

  it("can write to a config file", () => {
    const mongoConfig = {
      mongoDBName: "mockmockdb",
      mongoUri: "mongodb://fake.notreal"
    };
    const resultOfWrite = setup.writeMongoConfig(mongoConfig,configPath);
    expect(resultOfWrite).toBe(true);
    expect(fs.existsSync(configPath));
  });

  it("can set an object ref in jest global", ()=>{
    const obj = {foo:'bar'}
    const ref = setup.createGlobalDbReference(obj);
    expect(ref.foo).toEqual(global.__MONGOD__.foo);
  })

});

  describe('teardown unit tests', ()=>{

    xit('can stop a mongo server',()=>{

    });

  });

