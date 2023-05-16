class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  async addCart() {
    const result = await this.dao.addCart();
    return result;
  }

  async getCartProducts(cid) {
    const result = await this.dao.getCartProducts(cid);
    return result;
  }

  async updateProductQuantityFromCart(cid, pid, quantity) {
    const result = await this.dao.updateProductQuantityFromCart(
      cid,
      pid,
      quantity
    );
    return result;
  }

  async updateProductsFromCart(cid, productos) {
    const result = await this.dao.updateProductsFromCart(cid, productos);
    return result;
  }

  async deleteSingleProductFromCart(cid, pid) {
    const result = await this.dao.deleteSingleProductFromCart(cid, pid);
    return result;
  }

  async deleteAllProductsFromCart(cid) {
    const result = await this.dao.deleteAllProductsFromCart(cid);
    return result;
  }
}

module.exports = CartService;
