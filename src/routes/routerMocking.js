const { Router } = require("express");
const { faker } = require("@faker-js/faker");

const routerMocking = Router();

const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.alpha(5),
    price: faker.commerce.price(),
    stock: faker.string.numeric(1),
    category: faker.helpers.arrayElement([
      "Delanteros",
      "Centrocampistas",
      "Defensores",
      "Arqueros",
    ]),
    thumbnail: faker.image.url(),
    status: faker.helpers.arrayElement(["true", "false"]),
  };
};

routerMocking.get("/", (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProducts());
  }
  res.status(200).send({ status: "success", products });
});

module.exports = routerMocking;
