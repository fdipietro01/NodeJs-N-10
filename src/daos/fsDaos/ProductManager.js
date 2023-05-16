const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  addProduct = async (
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail
  ) => {
    const producto = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    };
    const data = await this.getProducts();
    if (data.some((prod) => prod.code === code)) {
      throw new Error("Producto con código duplicado");
    }
    data.length === 0
      ? (producto.id = 1)
      : (producto.id = data[data.length - 1].id + 1);
    const newData = JSON.stringify([...data, producto]);
    try {
      await fs.promises.writeFile(this.path, newData, "utf-8");
      return producto;
    } catch (err) {
      throw new Error("Error al grabar el producto", err);
    }
  };

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      try {
        const data = await fs.promises.readFile(this.path);
        const dataParsed = JSON.parse(data);
        const avaiableProducts = dataParsed.filter((prd) => prd.status);
        return avaiableProducts;
      } catch (err) {
        throw new Error("Error al leer productos", err);
      }
    } else {
      await fs.promises.writeFile(this.path, "[]", "utf-8");
      return [];
    }
  };

  getProductById = async (id) => {
    const data = await this.getProducts();
    const find = data.find((prod) => prod.id === id);
    const idx = data.findIndex((prod) => prod.id === id);
    if (find) return { find, idx };
    else throw new Error("Producto no encontrado");
  };

  updateProduct = async (id, prod) => {
    const keys = Object.keys(prod);
    const values = Object.values(prod);
    try {
      const products = await this.getProducts();
      const { find, idx } = await this.getProductById(Number(id));
      keys.forEach((key, pos) => {
        find[key] = values[pos];
      });
      products[idx] = find;
      await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
      return find;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const { find, idx } = await this.getProductById(Number(id));
      find.status = false;
      products[idx] = find;
      await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
      return find;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = ProductManager;
