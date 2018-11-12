export default async function teardown(){
  await stopMongoServer(global.__MONGOD__);
}


export async function stopMongoServer(server) {
  const result =  await server.stop();
  server.isRunning = false;
  return result;
};
