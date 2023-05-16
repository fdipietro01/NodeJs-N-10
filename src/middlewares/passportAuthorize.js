const autorization = (role) => async (req, res, next) => {
  if (!req.user)
    return res.status(403).send({ message: "Usuario no autorizado" });
  if (req.user.role !== role) {
    return res
      .status(403)
      .send({ message: "No tiene permisos para esta acción" });
  }
  next();
};

module.exports = autorization;
