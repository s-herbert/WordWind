const { dbMap } = require("../dbMap");

const messageSchema = new dbMap.Schema({
  text: String,
  author: { type: String, required: true },
  date_added: { type: Date, default: Date.now }
});

export default dbMap.model("Message", messageSchema);
