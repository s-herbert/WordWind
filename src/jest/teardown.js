import {stopMongoServer} from './utils/teardownHelpers';

export default async function teardown(){
  await stopMongoServer(global.__MONGOD__);
}




module.exports = teardown;
