const Errors = require("../errors/errorEnum");

const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case Errors.INVALID_TYPES:
      return res.send({
        status: "error",
        error: error.name,
        erroCause: error.cause,
      });
    case Errors.PARAM_ERROR:
      return res.send({
        status: "error",
        error: error.name,
        erroCause: error.cause,
      });
      break;
    default:
      return res.send({ status: "error", error: "Error indefinido" });
      break;
  }
};

module.exports = errorHandler;
