const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(
    global.__MONGO_URI__,
    { dbName: global.__MONGO_DB_NAME__, useNewUrlParser: true }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("the persistent db", () => {
  it("has a message model", () => {
    expect(mongoose.connection.modelNames()).toContain("message");
  });

  it("has a user model", () => {
    expect(mongoose.connection.modelNames()).toContain("users");
  });

  it("has a convo model", () => {
    expect(mongoose.connection.modelNames()).toContain("conversations");
  });
});
