import "cross-fetch/polyfill";

import express from "express";
import bodyParser from "body-parser";
import CultureBot from "./settings/config";
import { finale } from "speedybot-mini";

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.post("/speedybot", async (req, res) => {
  const json = req.body;
  // Here could check headers for X-Spark-Signature and hash with a secret to verify envelope is authentic
  // For more info see: https://github.com/valgaze/speedybot-mini/blob/deploy/docs/webhooks.md#secrets

  const proceed = CultureBot.isEnvelope(json);
  if (proceed) {
    await CultureBot.processIncoming(json);
  }
  res.status(200).send(finale());
});

app.post("/incoming_webhook", async (req, res) => {
  const data = req.body;
  const bot = CultureBot.IncomingWebhooks();
  if (String(data.id) === "5") {
    // bot.sendRoom('roomId123456', `The data was 5`)

    // Send text
    bot.dm("valgaze@cisco.com", "A webhook just hit the server!");

    // Send a card
    bot.dm(
      "valgaze@cisco.com",
      bot
        .card()
        .setTitle("Attention!")
        .setText("Youha ve been identified as data 5")
    );

    // Send a file with data
    bot.dmDataAsFile(
      "valgaze@cisco.com",
      {
        message: "Data report",
        id: data.id,
        stamp: new Date().toISOString(),
      },
      "json"
    );
  }
  res.send(
    `Register your bot's with Speedybot Garage: https://codepen.io/valgaze/full/MWVjEZV`
  );
});

// For "standard" chat traffic
app.get("/", (_, res) => {
  res.send(
    "Register your bot's with Speedybot Garage: https://codepen.io/valgaze/full/MWVjEZV"
  );
});
app.listen(port, () => {
  console.log(`Listening + tunneled on port ${port}`);
});
