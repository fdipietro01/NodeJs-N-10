class ChatService {
  constructor(dao) {
    this.dao = dao;
  }

  async getMessages() {
    const result = await this.dao.getMessages();
    return result;
  }
  async addMessage(message) {
    const result = await this.dao.addMessage(message);
    return result;
  }
}

module.exports = ChatService;
