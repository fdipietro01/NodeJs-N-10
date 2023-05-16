const fs = require("fs");
const UsersManager = require("../mongoDaos/UsersManager");

class UsersManager {
  constructor(path) {
    this.path = path;
  }

  getAllUsers = async () => {
    if (fs.existsSync(this.path)) {
      try {
        const data = await fs.promises.readFile(this.path);
        const dataParsed = JSON.parse(data);
        return dataParsed;
      } catch (err) {
        throw new Error("Error al leer productos", err);
      }
    } else {
      await fs.promises.writeFile(this.path, "[]", "utf-8");
      return [];
    }
  };

  async getUser(email) {
    const data = await this.getAllUsers();
    const find = data.find((usr) => usr.email === email);
    const idx = data.findIndex((usr) => usr.email === email);
    if (find) return { find, idx };
    else throw new Error("Producto no encontrado");
  }
  updateUser = async (email, password) => {
    try {
      const users = await this.getAllUsers();
      const { find, idx } = await this.getSingleUser(email);
      if (find) {
        find.password = password;
        users[idx] = find;
        await fs.promises.writeFile(this.path, JSON.stringify(users), "utf-8");
        return { updated: find };
      }
      return { updated: "not found" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  updateUserCart = async (email, carrito) => {
    try {
      const users = await this.getAllUsers();
      const { find, idx } = await this.getSingleUser(email);
      if (find) {
        find.carrito = carrito;
        users[idx] = find;
        await fs.promises.writeFile(this.path, JSON.stringify(users), "utf-8");
        return { updated: find };
      }
      return { updated: "not found" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  updateUserticket = async (email, ticket) => {
    try {
      const users = await this.getAllUsers();
      const { find, idx } = await this.getSingleUser(email);
      if (find) {
        find.ticket = ticket;
        users[idx] = find;
        await fs.promises.writeFile(this.path, JSON.stringify(users), "utf-8");
        return { updated: find };
      }
      return { updated: "not found" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  deleteUser = async (id) => {
    try {
      if (find) {
        find.password = password;
        users[idx] = find;
        await fs.promises.writeFile(this.path, JSON.stringify(users), "utf-8");
        return { deleted: find };
      }
      return { deleted: "not found" };
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = UsersManager;
