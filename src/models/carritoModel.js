const { Schema, model } = require("mongoose");

const collection = "carritos";
const CarritoSchema = new Schema({
  productos: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: "productos" },
        quantity: { type: Number },
      },
    ],
  },
});

CarritoSchema.pre("findOne", function () {
  this.populate("productos.product");
});

module.exports = model(collection, CarritoSchema);
