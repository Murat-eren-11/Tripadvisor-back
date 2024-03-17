const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "Murat",
  key: process.env.MAILGUN_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ message: "hello bg" });
});

app.post("/form", async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;

    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "e.murat75@gmail.com",
      subject: "Formulaire JS",
      text: message,
    };
    // console.log(messageData);
    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );
    // console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("serveur STARTED");
});
