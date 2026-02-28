const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/webhook", async (req, res) => {
  const from = req.body.From;
  const body = req.body.Body;

  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      text: `Neue WhatsApp Nachricht:\nVon: ${from}\n\n${body}`
    }
  );

  res.send("<Response></Response>");
});

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
