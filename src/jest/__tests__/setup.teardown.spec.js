import * as setup from "../setup";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as path from "path";
import * as fs from "fs";

afterAll(()=>{
  fs.unlinkSync(setup.globalConfigPath);
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
  }, 60000);

  it("can write to a config file", () => {
    const mongoConfig = {
      mongoDBName: "mockmockdb",
      mongoUri: "mongodb://fake.notreal"
    };
    const resultOfWrite = setup.writeMongoConfig(
      mongoConfig,
      setup.globalConfigPath
    );
    expect(resultOfWrite).toBe(true);
    expect(fs.existsSync(setup.globalConfigPath)).toBe(true);
  });

  it("can set an object ref in jest global", () => {
    const obj = { foo: "bar" };
    const ref = setup.createGlobalDbReference(obj);
    expect(ref.foo).toEqual(global.__MONGOD__.foo);
  });
});

describe("setup integration test", () => {
  it("creates a memory server, starts it, sets a uri, writes a config file, sets a global ref", () => {
    expect.assertions(5);
    return setup
      .default()
      .then(() => {
        expect(fs.existsSync(setup.globalConfigPath)).toBe(true);
        expect(global.__MONGOD__).toBeInstanceOf(MongoMemoryServer);
        expect(global.__MONGOD__.runningInstance).toBeDefined();
        expect(global.__MONGOD__.isRunning).toBe(true);
        expect(global.__MONGOD__.stop()).toBeInstanceOf(Promise);
      })
      .catch(err => console.log(err));
  });
});

describe("teardown unit tests", () => {
  xit("can stop a mongo server", () => {});
});
