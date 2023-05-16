const chat = [];
class ChatManager {
  getMessages() {
    try {
      return chat;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async addMessage(message) {
    try {
      chat.push(message);
      return chat;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = ChatManager;
