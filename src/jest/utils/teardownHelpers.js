export async function stopMongoServer(server) {
  const result =  await server.stop();
  server.isRunning = false;
  return result;
};