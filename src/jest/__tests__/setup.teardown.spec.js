import * as setup from "../setup";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as path from "path";
import * as fs from "fs";

const configPath = path.join(__dirname,'config.json');

afterAll(()=>{
  fs.unlinkSync(configPath);
})


describe("setup unit tests", () => {
  it("says foo", () => {
    expect(setup.foo()).toBe("foo");
  });

  it("creates a MongoMemoryServer instance", () => {
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



  describe('teardown unit tests', ()=>{

    it('can stop a mongo server',()=>{
      console.log(global);
    });

  })
});
