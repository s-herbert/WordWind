

describe("the persistent db", () => {
  describe("general functionality", () => {
    const dbCxn = require("../dbConnection");
    it("knows if its connected",()=>{
      expect(dbCxn.isOpen()).toBe(false);
    });

    it("#openConnection() can connect", async () => {
      expect.assertions(2)
      expect(dbCxn.open).toBeInstanceOf(Function);
      return dbCxn.open()
      .then(()=>(expect(dbCxn.isOpen()).toBe(true)));
    });

    it("#getModelNames returns an array", () => {
      expect(dbCxn.getModelNames).toBeInstanceOf(Function);
      expect(dbCxn.getModelNames()).toBeInstanceOf(Array);
    });

    it("#closeConnection() can disconnect", async () => {
      expect.assertions(2);
      expect(dbCxn.close).toBeInstanceOf(Function);
      await dbCxn.close();
      expect(dbCxn.isOpen()).toBe(false);
    });

    it("shouldn't connect with bad uri",()=>{
      expect.assertions(1);
      return dbCxn.open('mongodb://asldkfjsalffs.com', {connectTimeoutMS:4000})
      .catch(err=>expect(err).toBeInstanceOf(Error));
    },24000)
  });

  describe("schema", () => {
    const dbCxn = require("../dbConnection");
    beforeAll(async () => {
      await dbCxn.open();
    });

    afterAll(async () => {
      await dbCxn.close();
    });

    xit("has a message model", () => {
      expect(dbCxn.getModelNames()).toContain("message");
    });

    xit("has a user model", () => {
      expect(dbCxn.getModelNames()).toContain("users");
    });
  });
});
