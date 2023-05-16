class ProductService {
  constructor(dao) {
    this.dao = dao;
  }
  async addProduct(producto) {
    const result = await this.dao.addProduct(producto);
    return result;
  }

  async getProducts(limit, pageParam, sort, category, status) {
    const result = await this.dao.getProducts(
      limit,
      pageParam,
      sort,
      category,
      status
    );
    return result;
  }

  async getProductById(id) {
    const result = await this.dao.getProductById(id);
    return result;
  }

  async updateProduct(id, newProd) {
    const result = await this.dao.updateProduct(id, newProd);
    return result;
  }

  async deleteProduct(id) {
    const result = await this.dao.deleteProduct(id);
    return result;
  }
}

module.exports = ProductService;
