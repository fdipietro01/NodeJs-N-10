const { Schema, model } = require("mongoose");

const collection = "ordenes";
const OrdenesSchema = new Schema({
  totalPrice: { type: Number },
  created: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "usuarios" },
  product: { type: Schema.Types.ObjectId, ref: "productos" },
});

module.exports = model(collection, OrdenesSchema);
