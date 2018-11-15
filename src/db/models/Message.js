const mongoose = require('../db');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
  text: String,
  author: String,
  timestamp: {type: Date, default: Date.now}, 
})

export default mongoose.model('Message',messageSchema);