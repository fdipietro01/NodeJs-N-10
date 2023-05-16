const router = require("./routes/index");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./middlewares/passportMiddleware");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

//enable cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//setear cookies
app.use(cookieParser());

app.use("/aleas", express.static(__dirname + "/public"));

//parse Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting passport
app.use(passport.initialize());
initializePassport();

//setting router
app.use("/", router);

const httpServer = app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto", process.env.PORT);
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.set("socketio", io);
