const { User } = require("../service/index");

class UsuarioController {
  async getUsers(req, res) {
    const usuarios = await User.getUser();
    res.status(200).send({
      usuarios,
    });
  }
  catch(err) {
    res.send({ error: err.message });
  }

  async updateUserCart(req, res) {
    const { uid, cid } = req.params;
    const updated = await User.updateUserCart(uid, cid);
    return res.status(200).send({ message: "succesfull", user: updated });
  }
  async updateUserTicket(req, res) {
    const { uid, tid } = req.params;
    const updated = await User.updateUserTicket(uid, cid);
    return res.status(200).send({ message: "succesfull", user: updated });
  }
}

module.exports = new UsuarioController();
