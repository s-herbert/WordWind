const db = require("../db");

describe("the persistent db", () => {
  describe("general functionality", () => {

    it("knows if its connected",()=>{
      expect(db.isConnected()).toBe(false);
    });
    
    it("can connect", async () => {
      return db.openConnection()
      .then(()=>(expect(db.isConnected()).toBe(true)));
    });

    it("can disconnect", async () => {
      await db.closeConnection();
      expect(db.isConnected()).toBe(false);
    });
  });

  describe("schema", () => {
    // beforeAll(async () => {
    //   await mongoose.connect(
    //     global.__MONGO_URI__,
    //     { dbName: global.__MONGO_DB_NAME__, useNewUrlParser: true }
    //   );
    // });

    // afterAll(async () => {
    //   await mongoose.disconnect();
    // });

    xit("has a message model", () => {
      expect(mongoose.connection.modelNames()).toContain("message");
    });

    xit("has a user model", () => {
      expect(mongoose.connection.modelNames()).toContain("users");
    });
  });
});
