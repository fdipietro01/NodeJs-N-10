class TicketService {
  constructor(dao) {
    this.dao = dao;
  }
  async createPurchase(
    code,
    date,
    totalAmount,
    email,
    productsPurchase,
    productsOutOfStock
  ) {
    const result = await this.dao.createPurchase(
      code,
      date,
      totalAmount,
      email,
      productsPurchase,
      productsOutOfStock
    );
    return result;
  }

  async getTicketPurchase(id) {
    const result = await this.dao.purchase(cid);
    return result;
  }
}
module.exports = TicketService;
