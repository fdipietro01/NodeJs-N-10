const config = require("../config/config");
let ProductDao;
let UserDao;
let CartDao;
let SessionDao;
let TicketDao;
let ChatDao;

switch (config.persistence) {
  case "MONGO":
    config.dbConection();
    ProductDao = require("./mongoDaos/ProductManager");
    UserDao = require("./mongoDaos/UsersManager");
    CartDao = require("./mongoDaos/CartManager");
    SessionDao = require("./mongoDaos/UsersManager");
    TicketDao = require("./mongoDaos/TicketManager");
    ChatDao = require("./mongoDaos/ChatManager");
    break;
  case "MEMORY":
    ProductDao = require("./fsDaos/ProductManager");
    UserDao = require("./fsDaos/UserManager");
    CartDao = require("./fsDaos/CartManager");
    SessionDao = require("./fsDaos/UserManager");
    TicketDao = require("./fsDaos/TicketManager");
    ChatDao = require("./fsDaos/ChatManager");
    break;
}

module.exports = {
  ProductDao,
  UserDao,
  CartDao,
  SessionDao,
  TicketDao,
  ChatDao,
};
