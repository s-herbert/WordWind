import * as setup from "../setup";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as fs from "fs";
import * as teardown from "../teardown";

afterAll(() => {
  fs.unlinkSync(setup.globalConfigPath);
});

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

  it("it will not spin up an already spinnning connection", () => {
    const memoryServer = new MongoMemoryServer({ autoStart: false });
    memoryServer.isRunning = true;
    expect.assertions(2);
    return setup
      .startMongo(memoryServer)
      .then(result => {
        expect(memoryServer.runningInstance).toBeUndefined();
        expect(result).toBe(true);
      })
      .catch(err => console.error(err));
  });

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

describe("teardown unit tests", () => {
  it("can stop a mongo server", () => {
    const memoryServer = new MongoMemoryServer({ autoStart: false });
    expect.assertions(2);
    return memoryServer
      .start()
      .then(() => teardown.stopMongoServer(memoryServer))
      .then(result => {
        expect(memoryServer.runningInstance).toBe(null);
        expect(result).toBe(true);
      });
  });
});
