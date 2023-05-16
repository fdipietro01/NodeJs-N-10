const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const JWTStrategy = Strategy;
const ExtractJWT = ExtractJwt;

const cookieField = process.env.COOKIE_FIELD;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[cookieField];
  }
  console.log({ token });
  return token;
};

const initializePassport = () => {
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

module.exports = initializePassport;
