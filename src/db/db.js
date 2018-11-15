const mongoose = require("mongoose");

let myURI;
const URI = myURI || global.__MONGO_URI__;

export async function openConnection(){
  await mongoose.connect(URI);
  const db = mongoose.connection;
  db.on('error', error => console.log(error));
  db.once('open', ()=> console.log("connected to db)"));
  return db;
}

export async function closeConnection(){
  await mongoose.connection.close();
  return mongoose.connection.readyState === 0;
}

export function isConnected(){
  return mongoose.connection.readyState === 1;
}


