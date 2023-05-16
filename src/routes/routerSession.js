const { Router } = require("express");
const passportAutenticate = require("../middlewares/passportAutenticate");
const passportIsAlreadyLogged = require("../middlewares/isAlreadyLogged");

const sessionController = require("../controller/sessionController");

const sessionsRouter = Router();

sessionsRouter.post(
  "/login",
  passportIsAlreadyLogged("current"),
  sessionController.login
);

sessionsRouter.post(
  "/register",
  passportIsAlreadyLogged("current"),
  sessionController.register
);

sessionsRouter.post("/relogin", sessionController.relogin);

sessionsRouter.get(
  "/logout",
  passportAutenticate("current"),
  sessionController.logout
);

sessionsRouter.get(
  "/current",
  passportAutenticate("current"),
  sessionController.current
);

module.exports = sessionsRouter;
