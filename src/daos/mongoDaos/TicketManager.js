const TicketModel = require("../../models/ticketModel");

class TicketManager {
  constructor() {
    this.model = TicketModel;
  }
  async createPurchase(
    code,
    date,
    totalAmount,
    email,
    productsPurchase,
    productsOutOfStock
  ) {
    try {
      const ticket = await this.model.create({
        code,
        date,
        totalAmount,
        email,
        productsPurchase,
        productsOutOfStock,
      });
      return ticket;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getPurchase(id) {}
}

module.exports = TicketManager;
