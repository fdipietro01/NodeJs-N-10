const createProductErrorInfo = (product) => {
  console.log(product);
  return `One or more product properties were incomplete or not valid.
    List of requieed properties:
    *title: needs to be a string, recived ${product.title}
    *category: needs to be one of [arqueros, defensores, centrocampistas, delanteros], recived ${product.category}
    *description: needs to be a string, recived ${product.description}
    *code: needs to be a number, recived ${product.code}
    *stock: needs to be a number, recived ${product.stock}
    *status: needs to be a string, recived ${product.true}
    *thumbnail: needs to be a string, recived ${product.thumbnail}`;
};

const createEditCartErrorInfo = (cart) => {
  return `One or more properties were incomplete or not valid.
    List of requieed properties:
    *cartId: needs to be a string, recived ${cart.cartd}
    *productId: needs to be a string, recived ${cart.pid}
    *quantity: needs to be a number, recived ${cart.quantity}`;
};

module.exports = { createProductErrorInfo, createEditCartErrorInfo };
