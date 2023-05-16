const bcrypt = require("bcrypt");

const cryptPass = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

const validatePassword = (user, pass) =>
  bcrypt.compareSync(pass, user.password);

module.exports = { cryptPass, validatePassword };
