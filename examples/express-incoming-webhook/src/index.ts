import "cross-fetch/polyfill";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { finale } from "speedybot-mini";
import { resolve } from "path";
import CultureBot from "./../settings/config";
import { validateWebhook } from "./validateWebhook";

// Expects .env to get token on BOT_TOKEN
dotenv.config({ path: resolve(__dirname, "..", ".env") });

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

const token = process.env.BOT_TOKEN as string;
if (!token) {
  console.log("\n## Token missing (check .env file)");
  process.exit(0);
}
CultureBot.setToken(token);

app.post("/speedybot", async (req, res) => {
  const json = req.body;
  // Here could check headers for X-Spark-Signature and hash with a secret to verify envelope is authentic
  // For more info see: https://github.com/valgaze/speedybot-mini/blob/deploy/docs/webhooks.md#secrets

  const signature = req.header("x-spark-signature");
  const webhookSecret = process.env.WEBHOOK_SECRET;

  // Validate webhook
  if (webhookSecret && signature) {
    const proceed = validateWebhook(json, webhookSecret, signature);
    if (proceed === false) {
      return res.send("Webhook Secret Rejected");
    }
  }

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

app.get("/", (_, res) => {
  res.send(
    "Register your bot's with Speedybot Garage: https://codepen.io/valgaze/full/MWVjEZV"
  );
});

app.listen(port, () => {
  console.log(`Listening + tunneled on port ${port}`);
});
