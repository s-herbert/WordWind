export const mongoose = require("mongoose");

export async function open(URI = global.__MONGO_URI__, options = {}) {
  await mongoose.connect( URI, { ...options, useNewUrlParser: true});
  const db = mongoose.connection;
  return db;
}

export async function close() {
  await mongoose.connection.close();
  return mongoose.connection.readyState === 0;
}

export function isOpen() {
  return mongoose.connection.readyState === 1;
}

export function getModelNames(){
  return mongoose.connection.modelNames();
}
