export default async function teardown(){
  stopMongoServer(global.__MONGOD__);
}


export async function stopMongoServer(server) {
  await server.stop();
  console.log('mongod server stopped')
};
