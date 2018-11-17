const { dbMap } = require("../dbMap");

const userSchma = new dbMap.Schema({
  text: String,
  author: String,
  date_added: { type: Date, default: Date.now }
});

export default dbMap.model("User", userSchma);