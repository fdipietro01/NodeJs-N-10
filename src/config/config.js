const MongoStore = require("connect-mongo");
const MongoSingleton = require("../daos/mongoDaos/MongoSingleton");

require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;

const config = {
  persistence: process.env.PERSISTENCE,
  dbConection: () => MongoSingleton.connect(),
  session: {
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 130000000,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
  },
};

module.exports = config;
