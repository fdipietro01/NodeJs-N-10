const passport = require("passport");

const passportIsLogged = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return next();
      }
      res.status(200).send({ message: "Already Logged" });
    })(req, res, next);
  };
};

module.exports = passportIsLogged;
