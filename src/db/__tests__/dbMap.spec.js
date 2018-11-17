

describe("the persistent db", () => {
  describe("general functionality", () => {
    const dbMap = require("../dbMap");
    it("knows if its connected",()=>{
      expect(dbMap.isOpen()).toBe(false);
    });

    it("#openConnection() can connect", async () => {
      expect.assertions(2)
      expect(dbMap.open).toBeInstanceOf(Function);
      return dbMap.open()
      .then(()=>(expect(dbMap.isOpen()).toBe(true)));
    });

    it("#getModelNames returns an array", () => {
      expect(dbMap.getModelNames).toBeInstanceOf(Function);
      expect(dbMap.getModelNames()).toBeInstanceOf(Array);
    });

    it("#getRequiredPaths(model) returns an array", () => {
      expect(dbMap.getModelNames).toBeInstanceOf(Function);
      expect(dbMap.getRequiredPaths()).toBeInstanceOf(Array);
    });

    it("#closeConnection() can disconnect", async () => {
      expect.assertions(2);
      expect(dbMap.close).toBeInstanceOf(Function);
      await dbMap.close();
      expect(dbMap.isOpen()).toBe(false);
    });

    it("shouldn't connect with bad uri",()=>{
      expect.assertions(1);
      return dbMap.open('mongodb://asldkfjsalffs.com', {connectTimeoutMS:4000})
      .catch(err=>expect(err).toBeInstanceOf(Error));
    },24000)

  });

  describe("schema", () => {
    const dbMap = require("../dbMap");
    beforeAll(async () => {
      await dbMap.open();
    });

    afterAll(async () => {
      await dbMap.close();
    });

    it("has a message model", () => {
      require('../models/Message')
      expect(dbMap.getModelNames()).toContain("Message");
    });

    it("messages require an author", () => {
      require('../models/Message')
      expect(dbMap.getRequiredPaths('Message')).toContain("author");
    });

    it("has a user model", () => {
      require('../models/User')
      expect(dbMap.getModelNames()).toContain("User");
    });

    it("users require a public key", () =>{
      require('../models/User')
      expect(dbMap.getRequiredPaths('User')).toContain("pub_key")
    })
  });
});
