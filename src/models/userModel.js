const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "usuarios";
const userSchema = Schema({
  nombre: {
    type: "String",
    require: true,
  },
  apellido: {
    type: "String",
    require: true,
  },
  email: {
    type: "String",
    unique: true,
    required: true,
    index: true,
  },
  edad: {
    type: "Number",
    required: true,
  },
  password: {
    type: "String",
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  carrito: { type: Schema.Types.ObjectId, ref: "carritos" },
  ticket: { type: Schema.Types.ObjectId, ref: "ticket" },
});

userSchema.plugin(mongoosePaginate);

const userModel = model(collection, userSchema);
module.exports = userModel;
