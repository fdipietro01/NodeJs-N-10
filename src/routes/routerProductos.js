const { Router } = require("express");
const passportAuthorize = require("../middlewares/passportAuthorize");
const passportAutenticate = require("../middlewares/passportAutenticate");
const productController = require("../controller/productController");

const routerProductos = Router();

routerProductos.get("/", productController.getProducts);
routerProductos.get("/:pid", productController.getProductById);

routerProductos.post(
  "/",
  passportAutenticate("current"),
  passportAuthorize("Admin"),
  productController.addProduct
);

routerProductos.put(
  "/:pid",
  passportAutenticate("current"),
  passportAuthorize("Admin"),
  productController.editProduct
);

routerProductos.delete(
  "/:pid",
  passportAutenticate("current"),
  passportAuthorize("Admin"),
  productController.deleteProduct
);

module.exports = routerProductos;
