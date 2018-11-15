

describe("the persistent db", () => {
  describe("general functionality", () => {
    const db = require("../db");
    it("knows if its connected",()=>{
      expect(db.isConnected()).toBe(false);
    });

    it("shouldn't connect with bad uri",()=>{
      expect.assertions(1);
      return db.openConnection('mongodb://asldkfjsalffs.com', {connectTimeoutMS:4000})
      .catch(err=>expect(err).toBeInstanceOf(Error));
    },24000)

    it("#openConnection() can connect", async () => {
      expect.assertions(1)
      return db.openConnection()
      .then(()=>(expect(db.isConnected()).toBe(true)));
    });

    it("#closeConnection() can disconnect", async () => {
      expect.assertions(1);
      await db.closeConnection();
      expect(db.isConnected()).toBe(false);
    });
  });

  describe("schema", () => {
    const db = require("../db");
    beforeAll(async () => {
      await db.openConnection();
    });

    afterAll(async () => {
      await db.closeConnection();
    });

    xit("has a message model", () => {
      expect(db.getModelNames()).toContain("message");
    });

    xit("has a user model", () => {
      expect(db.getModelNames()).toContain("users");
    });
  });
});
