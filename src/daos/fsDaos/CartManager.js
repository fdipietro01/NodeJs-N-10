const fs = require("fs");

class CartMaganer {
  constructor(path) {
    this.path = path;
  }
  addCart = async () => {
    try {
      const carrito = {
        productos: [],
      };
      const data = await this.getCarritos();
      data.length === 0
        ? (carrito.id = 1)
        : (carrito.id = data[data.length - 1].id + 1);
      const newData = JSON.stringify([...data, carrito]);
      await fs.promises.writeFile(this.path, newData, "utf-8");
      return carrito;
    } catch (err) {
      throw new Error("Error al crear el carrito", err);
    }
  };

  getCartProducts = async (id) => {
    try {
      const { find } = await this.getCarritosById(id);
      return find.productos;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  updateProductQuantityFromCart = async (cid, pid, quantity) => {
    try {
      const carritos = await this.getCarritos();
      const { find: cart, idx } = await this.getCarritosById(cid);
      const prodFind = cart.productos.find((prod) => prod.product === pid);
      !prodFind
        ? cart.productos.push({ product: pid, quantity })
        : (prodFind.quantity = quantity);
      carritos[idx] = cart;
      await fs.promises.writeFile(this.path, JSON.stringify(carritos), "utf-8");
      return carritos;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  updateProductsFromCart = async (cid, productos) => {
    try {
      const carritos = await this.getCarritos();
      const { find: cart, idx } = await this.getCarritosById(cid);
      if (find) {
        cart.productos = productos;
        carritos[idx] = cart;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carritos),
          "utf-8"
        );
        return { cartUpdated: cart };
      }
      return { cartUpdated: "not found" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  deleteSingleProductFromCart = async (cid, pid) => {
    try {
      const carritos = await this.getCarritos();
      const { find: cart, idx } = await this.getCarritosById(cid);
      if (find) {
        cart.productos.splice(pid, 1);
        carritos[idx] = cart;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carritos),
          "utf-8"
        );
        return { cart };
      }
      return { cart: "not foud" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  deleteAllProductsFromCart = async (cid) => {
    try {
      const carritos = await this.getCarritos();
      const { find: cart, idx } = await this.getCarritosById(cid);
      if (find) {
        cart.productos = [];
        carritos[idx] = cart;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carritos),
          "utf-8"
        );
        return { cart };
      }
      return { cart: "not foud" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  purchase(cid) {}
}
module.exports = CartMaganer;
