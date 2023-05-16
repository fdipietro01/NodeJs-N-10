const {
  UserDao,
  ProductDao,
  CartDao,
  SessionDao,
  TicketDao,
  ChatDao,
} = require("../daos/factory");
const ProductService = require("./ProductService");
const CartService = require("./CartService");
const UserService = require("./UserService");
const SessionService = require("./SessionService");
const TicketService = require("./TicketService");
const ChatService = require("./ChatService");

const Product = new ProductService(new ProductDao());
const Cart = new CartService(new CartDao());
const User = new UserService(new UserDao());
const Session = new SessionService(new SessionDao());
const Ticket = new TicketService(new TicketDao());
const Chat = new ChatService(new ChatDao());

module.exports = {
  Product,
  Cart,
  User,
  Session,
  Ticket,
  Chat,
};
