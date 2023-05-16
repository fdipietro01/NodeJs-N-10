const { validatePassword, cryptPass } = require("../utils/bcrypt");
const { generateToken } = require("../utils/token");
const { Session } = require("../service/index");
const LoginUserDto = require("../dtos/currentUserDto");
const CurrentUserDto = require("../dtos/currentUserDto");
const {
  COOKIE_FIELD: jwt,
  ADMIN_EMAIL: adminEmail,
  ADMIN_PASSWORD: adminPassword,
} = process.env;

class SessionControler {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const dbUser = await Session.getUser(email);
      if (dbUser === null || dbUser === undefined)
        return res.status(400).send({ message: "No existe el usuario" });
      if (!validatePassword(dbUser, password))
        return res.status(400).send({ message: "Password Incorrecta" });
      const user = { ...new LoginUserDto(dbUser) };

      const token = generateToken(user);
      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      if (!token) res.status(400).send({ message: "Error al loguear" });

      res.status(200).send({ message: "Logueado exitosamente", user, token });
    } catch (err) {
      res.status(400).send({ message: "Error al loguear" });
    }
  }

  async register(req, res) {
    const { email, password, nombre, apellido, edad, avatar, fecha } = req.body;
    if (
      !email ||
      !password ||
      !nombre ||
      !apellido ||
      !edad ||
      !avatar ||
      !fecha
    )
      return res.status(400).send({ message: "Campos incompletos" });
    const usr = await Session.getUser(email);

    if (usr) {
      return res.status(400).send({
        message: "Usuario ya registrado",
      });
    }
    let isAdmin = email === adminEmail && password === adminPassword;
    const user = {
      nombre,
      apellido,
      email,
      password: cryptPass(password),
      edad,
      avatar,
      role: isAdmin ? "Admin" : "User",
      fecha,
    };
    try {
      await Session.createUser(user);
      return res.status(200).send({
        message: `${user.nombre} ${user.apellido} te has registrado exitosamente`,
      });
    } catch (err) {
      return res.status(400).send({
        message: `Error al registrarse, revise los campos`,
      });
    }
  }

  async relogin(req, res) {
    const { mail, pass } = req.body;
    if (!mail || !pass)
      return res.send({
        status: 404,
        message: "Completar todos los campos",
      });
    const user = await Session.getUser(mail);
    if (!user)
      return res.send({
        status: 404,
        message: "Email no registrado",
      });
    else {
      await Session.updateUser(mail, cryptPass(pass));
      res.send({
        success: 200,
        message: `${user.nombre} ${user.apellido} has actualizado tu contraseña exitosamente`,
      });
    }
  }
  logout(req, res) {
    req.user = "";
    //res.clearCookie(jwt);
    res.status(200).send({ message: "deslogueo exitoso" });
  }
  async current(req, res) {
    const email = req.user.email;
    const dbUser = await Session.getUser(email);
    if (dbUser === null || dbUser === undefined)
      return res.status(400).send({ message: "No existe el usuario" });
    const user = new CurrentUserDto(dbUser);
    res.status(200).send({ message: "Usuario actual encontrado", user });
  }
}

module.exports = new SessionControler();
