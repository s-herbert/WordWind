
let setup;
beforeEach(()=>{
  setup = require('../setup');
}) 


describe('setup', ()=>{

  it('creates a MongoMemoryServer instance',()=>{
    expect(setup.mongod).toBeDefined();
  })

  it('can spin up a connection', ()=>{
    setup.startMongo();
    expect(setup.mongod.isRunning).toBe(true);
  })





})