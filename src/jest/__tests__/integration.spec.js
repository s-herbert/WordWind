import * as setup from "../setup";
import * as setupHelpers from "../utils/setupHelpers";
import * as teardown from "../teardown";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as fs from 'fs';

afterAll(() => {
  fs.unlinkSync(setupHelpers.globalConfigPath);
});

describe("setup & teardown integration test", () => {
  it("creates a memory server, starts it, sets a uri, writes a config file, sets a global ref", () => {
    expect.assertions(4);
    return setup.default()
      .then(() => {
        expect(fs.existsSync(setupHelpers.globalConfigPath)).toBe(true);
        expect(global.__MONGOD__).toBeInstanceOf(MongoMemoryServer);
        expect(global.__MONGOD__.runningInstance).toBeDefined();
        expect(global.__MONGOD__.isRunning).toBe(true);
      })
      .catch(err => console.log(err));
  });

  it("teardown stops the memory server",()=>{
    
    expect.assertions(2);
    return teardown.default()
      .then(()=>{
        expect(global.__MONGOD__.runningInstance).toBe(null);
        expect(global.__MONGOD__.isRunning).toBe(false);
      })
  });
});