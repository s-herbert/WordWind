export const dbMap = require("mongoose");

export async function open(URI = global.__MONGO_URI__, options = {}) {
  await dbMap.connect( URI, { ...options, useNewUrlParser: true});
  const db = dbMap.connection;
  return db;
}

export async function close() {
  await dbMap.connection.close();
  return dbMap.connection.readyState === 0;
}

export function isOpen() {
  return dbMap.connection.readyState === 1;
}

export function getModelNames(){
  return dbMap.connection.modelNames();
}