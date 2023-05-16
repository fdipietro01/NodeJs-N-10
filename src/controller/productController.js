const { Product } = require("../service/index");
const port = process.env.PORT;

class ProductController {
  async getProducts(req, res) {
    const { limit, page, sort, category, status } = req.query;
    try {
      const productsData = await Product.getProducts(
        limit,
        page,
        sort,
        category,
        status
      );
      res.send(productsData);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err);
    }
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    try {
      const productData = await Product.getProductById(pid);
      res.send(productData);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err);
    }
  }

  async addProduct(req, res) {
    const producto = req.body;
    if (req.body.status === undefined) req.body.status = true;
    try {
      await Product.addProduct(producto);
      res.status(200).send({ status: "succes" });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
  async editProduct(req, res) {
    const { pid } = req.params;
    const newProd = req.body;
    if (Object.keys(newProd).length === 0)
      return res.status(400).send("Enviar producto a actualizar");
    try {
      await Product.updateProduct(pid, newProd);
      res.status(200).json({ actualizado: "success" });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  async deleteProduct(req, res) {
    const { pid } = req.params;
    try {
      const deleted = await Product.deleteProduct(pid);
      if (deleted !== 0) res.status(200).json({ status: "succes" });
      else
        res.status(400).json({
          message: "Error al eliminar producto",
        });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        message: "Error al eliminar producto",
      });
    }
  }
}

module.exports = new ProductController();
