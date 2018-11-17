const { dbMap } = require("../dbMap");

const userSchema = new dbMap.Schema({
  text: String,
  author: String,
  pub_key: { type: String, required: true },
  date_added: { type: Date, default: Date.now }
});

export default dbMap.model("User", userSchema);
