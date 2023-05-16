const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;

class MongoSingleton {
  static #instance;
  constructor() {
    try {
      mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err, "Error al conectar a la db");
    }
  }
  static connect() {
    if (this.#instance) {
      console.log("Mongo already connected");
      return this.#instance;
    } else {
      this.#instance = new MongoSingleton();
      console.log("Mongo connect succesfull");
    }
  }
}

module.exports = MongoSingleton;
