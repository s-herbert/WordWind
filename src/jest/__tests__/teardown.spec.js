import { MongoMemoryServer } from "mongodb-memory-server";
import {stopMongoServer} from '../utils/teardownHelpers';


describe("teardown unit tests", () => {
  it("can stop a mongo server", () => {
    const memoryServer = new MongoMemoryServer({ autoStart: false });
    expect.assertions(2);
    return memoryServer
      .start()
      .then(() => stopMongoServer(memoryServer))
      .then(result => {
        expect(memoryServer.runningInstance).toBe(null);
        expect(result).toBe(true);
      });
  });
});
