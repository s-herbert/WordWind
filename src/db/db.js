const mongoose = require("mongoose");

export async function openConnection(URI = global.__MONGO_URI__, options = {}) {
  await mongoose.connect( URI, { ...options, useNewUrlParser: true});
  const db = mongoose.connection;
  console.log("Mongoose connection open");
  return db;
}

export async function closeConnection() {
  await mongoose.connection.close();
  console.log("Mongoose connection closed");
  return mongoose.connection.readyState === 0;
}

export function isConnected() {
  return mongoose.connection.readyState === 1;
}

export function getModelNames(){
  return mongoose.connection.modelNames();
}
