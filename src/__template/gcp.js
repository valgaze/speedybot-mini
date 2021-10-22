// Deps: $ npm i speedybot-mini

const functions = require("firebase-functions");
const { SpeedyLambda } = require("speedybot-mini");

const handlers = [
  {
    keyword: ["hello", "hey", "hi"],
    handler(bot, trigger) {
      const reply = `Heya how's it going ${trigger.person.displayName}?`;
      bot.say(reply);
    },
  },
  {
    keyword: ["ping", "pong"],
    handler(bot, trigger) {
      const normalized = trigger.text.toLowerCase();
      if (normalized === "ping") {
        bot.say("pong");
      } else {
        bot.say("ping");
      }
    },
    helpText: `A handler that says ping when the user says pong and vice versa`,
  },
  {
    keyword: ["joke", "dadjoke"],
    async handler(bot, trigger) {
      const res = await bot.get(
        "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
      );
      const { joke } = res.data;
      bot.say(`Here's a joke: ${joke}`);
    },
    helpText: `A handler that tells a joke from the joke-api v2`,
  },
];

const token = '__REPLACE__ME__'; // env, credential manager, 
const inst = SpeedyLambda(token, handlers);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  async (req, res) => {
    await inst(req.body)
    res.status(200).send('ok')
  }
);
