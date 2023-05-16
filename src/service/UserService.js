class UserService {
  constructor(dao) {
    this.dao = dao;
  }
  async getAllUsers() {
    const usuario = await this.dao.getAllUsers();
    return usuario;
  }
  async getUser(email) {
    const usuario = await this.dao.getSingleUser(email);
    return usuario;
  }
  async createUser(user) {
    const usuario = await this.dao.createUser(user);
    return usuario;
  }
  async updateUser(email, password) {
    const usuario = await this.dao.updateUser(email, password);
    return usuario;
  }
  async updateUserCart(id, cid) {
    const usuario = await this.dao.updateUserCart(id, cid);
    return usuario;
  }
  async updateUserTicket(uid, tid) {
    const usuario = await this.dao.updateUserTicket(uid, tid);
    return usuario;
  }
}

module.exports = UserService;
