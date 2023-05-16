const chatModel = require("../../models/chatModel");
class ChatManager {
  async getMessages() {
    try {
      const chats = await chatModel.find({});
      return chats;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async addMessage(message) {
    try {
      const response = await chatModel.create(message);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = ChatManager;
