const { mongoose } = require("../dbMap");
// const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: String,
  author: String,
  date_added: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);
