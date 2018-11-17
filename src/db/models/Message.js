const { dbMap } = require("../dbMap");

const messageSchema = new dbMap.Schema({
  subject: String,
  body: { type: String, required: true },
  author: { type: String, required: true },
  date_added: { type: Date, default: Date.now }
});

export default dbMap.model("Message", messageSchema);
