const express = require("express");
const sgMail = require("@sendgrid/mail");
require('dotenv').config();

const app = express();

app.get("/", async (req, res) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "zadeen99@gmail.com",
    from: "zeeshan99adeen@gmail.com",
    subject: "Sendgrid test",
    text: "This is a text 222",
  };

  async function sendMail() {
    try {
      await sgMail.send(msg)
    } catch (e) {
      console.log('error', e);
    }
  }

  await sendMail();

  res.send("HI");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
