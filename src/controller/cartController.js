const { Cart, Product, Ticket, User } = require("../service/index");

class CartController {
  async crearCarrito(req, res) {
    const cart = await Cart.addCart();
    res.status(200).send({ id: cart._id });
  }
  async getProductsFromCart(req, res) {
    const { cid } = req.params;

    try {
      const cartProducts = await Cart.getCartProducts(cid);
      return res.status(200).send({ stauts: "success", cartProducts });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
  async updateProductQuantityFromCart(req, res) {
    const { cid, pid, quantity } = req.body;
    try {
      await Cart.updateProductQuantityFromCart(cid, pid, quantity);
      res.status(200).send({ status: "success" });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async deleteCart(req, res) {
    const { cid } = req.params;
    try {
      await Cart.deleteAllProductsFromCart(cid);
      res.status(200).send({ status: "success" });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async deleteSingleProduct(req, res) {
    const { cid, pid } = req.params;
    try {
      await Cart.deleteSingleProductFromCart(cid, pid);
      res.status(200).send({ status: "success" });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async purchase(req, res) {
    const { cid } = req.params;
    const { email } = req.body;

    try {
      const cart = await Cart.getCartProducts(cid);
      let totalAmount = 0;
      let productsPurchase = [];
      let updatedStockProducts = [];
      let productsOutOfStock = [];
      let remainingProducts = [];

      //filtra los productos que están en el carrito de la db para tener los originales con el valor del stock
      const productsInCartWithStockPromise = cart.map(
        async (item) => await Product.getProductById(item.item._id)
      );
      const productsInCartWithStock = await Promise.all(
        productsInCartWithStockPromise
      );
      //filtra por productos fuera de stock y los que si tienen
      cart.forEach(({ item, quantity }) => {
        const itemInDb = productsInCartWithStock.find(
          (prod) => prod._id.toString() === item._id.toString()
        );
        if (quantity <= itemInDb.stock) {
          itemInDb.stock = itemInDb.stock - quantity;
          updatedStockProducts.push({ item: itemInDb, quantity });
          productsPurchase.push({ product: itemInDb._id, quantity });
          totalAmount += item.price * quantity;
        } else {
          productsOutOfStock.push({ product: itemInDb._id, quantity });
          remainingProducts.push({ item, quantity });
        }
      });

      //crea el ticket si hay productos por comprar
      if (productsPurchase.length > 0) {
        const code = Math.random().toString(36).slice(2);
        const date = Date.now();

        const response = await Ticket.createPurchase(
          code,
          date,
          totalAmount,
          email,
          productsPurchase,
          productsOutOfStock
        );
        //actualiza el carrito guardando ahora los productos no comprados
        await Cart.updateProductsFromCart(cid, productsOutOfStock.length ?? []);
        //actualiza el stock de los productos comprados
        updatedStockProducts.forEach(async ({ item }) => {
          await Product.updateProduct(item._id, item);
        });
        //actualiza al usuario para vincularle el ticket
        const userId = req.user._id;
        await User.updateUserTicket(userId, response._id);
        return response
          ? res.status(200).send({
              status: "success",
              message: "Compra realizada con éxito",
              data: {
                ...response._doc,
                remainingProducts,
                updatedStockProducts,
              },
            })
          : res.status(500).send({ status: "error", data: response });
      } else {
        return res.status(200).send({
          status: "error",
          message: "No hay stock en ningún producto para procesar la compra",
          data: { remainingProducts },
        });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new CartController();
