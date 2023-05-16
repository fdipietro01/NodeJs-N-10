const productModel = require("../../models/productoModel");
const { Types } = require("mongoose");

class ProductManager {
  constructor() {
    this.model = productModel;
  }
  addProduct = async (producto) => {
    try {
      await this.model.create(producto);
    } catch (err) {
      console.log(err);
      throw new Error("Error al grabar el producto", err);
    }
  };

  getProducts = async (
    limit = 5,
    pageParam = 1,
    sort = 1,
    category,
    status
  ) => {
    let query = {};

    if (category) {
      query.category = category;
    }
    if (status) query.status = Boolean(status);
    const params = {
      limit: Number(limit),
      page: Number(pageParam),
      sort: { price: sort },
      lean: true,
    };
    try {
      let dataProd;
      dataProd = await this.model.paginate(query, params);

      return {
        ...dataProd,
        status: "success",
      };
    } catch (err) {
      throw new Error("Error al leer productos", err);
    }
  };

  getProductById = async (id) => {
    const parsedId = new Types.ObjectId(id);
    const dataProd = await this.model.findById(parsedId);
    if (dataProd) return dataProd;
    else throw new Error("Producto no encontrado");
  };

  updateProduct = async (id, newProd) => {
    try {
      const a = await this.model.updateOne(
        { _id: new Types.ObjectId(id) },
        newProd
      );
    } catch (err) {
      throw new Error(err.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      const parsedId = new Types.ObjectId(id);
      const { deletedCount } = await this.model.deleteOne({
        _id: parsedId,
      });
      return deletedCount;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = ProductManager;
