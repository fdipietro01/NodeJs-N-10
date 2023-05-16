const { Schema, model } = require("mongoose");

const collection = "chat";
const ChatSchema = new Schema({
  user: { type: String },
  message: { type: String },
});

module.exports = model(collection, ChatSchema);
