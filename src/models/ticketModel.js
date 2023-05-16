const { Schema, model } = require("mongoose");

const collection = "ticket";

const TicketSchema = new Schema({
  code: { type: String, unique: true, required: true },
  purchase_date: { type: Date, required: true, default: Date.now() },
  totalAmount: { type: Number, required: true },
  email: { type: String, required: true },
  productsPurchase: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: "productos" },
        quantity: { type: Number },
      },
    ],
    required: true,
  },
  productsOutOfStock: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: "productos" },
        quantity: { type: Number },
      },
    ],
    required: true,
  },
});

module.exports = model(collection, TicketSchema);
