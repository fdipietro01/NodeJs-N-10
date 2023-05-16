const { Router } = require("express");
const { createTransport } = require("nodemailer");
const twilio = require("twilio");

const mailRouter = Router();

const transport = createTransport({
  service: "gmail",
  port: 578,
  auth: {
    user: process.env.TEST_MAIL_USER,
    pass: process.env.TEST_MAIL_PASS,
  },
});
mailRouter.get("/", async (req, res) => {
  try {
    let result = await transport.sendMail({
      from: process.env.TEST_MAIL_USER,
      to: "marian.caro2@gmail.com",
      subject: "hola, querido",
      html: "<div><p>Hola, este es un mail de prueba enviado desde la app en la que estoy trabajando</p> <p>El tema de la clase 30 es 'mailing' y use tu mail para probar</p> <img src='cid:michi'/> </div>",
      attachments: [
        {
          path: "https://http2.mlstatic.com/D_NQ_NP_701432-MLM53233840358_012023-V.jpg",
          cid: "michi",
        },
      ],
    });
    res.status(200).send({ message: "mensaje enviado" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
mailRouter.get("/twilio", async (req, res) => {
  try {
    await client.messages.create({
      body: "Este es un mensaje para michiburona",
      from: process.env.TWILIO_PHONE,
      to: process.env.MY_PHONE,
    });
    res.status(200).send({ message: "Mensaje enviado" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = mailRouter;
