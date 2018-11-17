const { dbMap } = require("../dbMap");

export const userSchema = new dbMap.Schema({
  name: String,
  password: {type: String, required: true },
  pub_key: { type: String, required: true },
  date_added: { type: Date, default: Date.now }
});

export default dbMap.model("User", userSchema);
