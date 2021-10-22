## Serverless Options

Once you have the deployed URL, register it as a webhook with

```sh
npx speedyhelper webhook register -t __REPLACE__ME__ -w https://aaabbbcccdddeee.execute-api.us-east-1.amazonaws.com
npx speedyhelper webhook remove -t __REPLACE__ME_ # remove all webhooks associated with token
npx speedyhelper webhook remove -t __REPLACE__ME_ -w https://aaabbbcccdddeee.execute-api.us-east-1.amazonaws.com # remove specific token
```

## AWS Lambda

```js
"use strict";

const token = '__REPLACE__ME__' // set via envs, credential manager, etc
const { SpeedyLambda, SpeedyCard } = require('speedybot')

const handlers = [	
    {
		keyword: ['hello', 'hey', 'hi'],
		handler(bot, trigger) {
			const reply = `Heya how's it going ${trigger.person.displayName}?`
			bot.say(reply)
		}
	},
	{
		keyword: ['ping', 'pong'],
		handler(bot, trigger) {
			const normalized = trigger.text.toLowerCase()
			if (normalized === 'ping') {
				bot.say('pong')
			} else {
				bot.say('ping')
			}
		},
		helpText: `A handler that says ping when the user says pong and vice versa`
	},
	{
		keyword: ['joke', 'dadjoke',],
		async handler(bot, trigger) {

			const res = await bot.get('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
			const { joke } = res.data
			bot.say(`Here's a joke: ${joke}`)
		},
		helpText: `A handler that tells a joke from the joke-api v2`
	},
	{
		keyword: ['healthcheck', 'health'],
		handler(bot, trigger) {
			const choices = [`At the tone, the time will be ${new Date}`]
			bot.say(choices[0])
	
			// Adapative Card: https://developer.webex.com/docs/api/guides/cards
			const cardPayload = new SpeedyCard().setTitle('System is 👍')
											.setSubtitle('If you see this card, everything is working')
											.setImage('https://i.imgur.com/SW78JRd.jpg')
											.setInput(`What's on your mind?`)
											.setUrl(pickRandom(['https://www.youtube.com/watch?v=3GwjfUFyY6M', 'https://www.youtube.com/watch?v=d-diB65scQU']), 'Take a moment to celebrate')
											.setTable([[`Bot's Date`, new Date().toDateString()], ["Bot's Uptime", `${String(process.uptime()).substring(0, 25)}s`]])

			bot.sendCard(cardPayload.render())
		},
		helpText: `Make sure all is working`
	}]
  
const inst = SpeedyLambda(token, handlers)
module.exports.speedyhandler = async (event, context) => {
    let data = {};
    if (event && event.body) {
        try {
            data = JSON.parse(event.body);
        } catch(e) { 
            return {
                statusCode: 400,
                body: JSON.stringify({message: 'There was an error parsing the JSON data posted to this endpoint', error:e})
            }
        }
    }

    try {
        await inst(data)
        const response = {
            statusCode: 200,
            body: JSON.stringify({message: 'ok'})
        };
        return response;
    } catch(e) {
        // Report errors related with connection, auth, DB write, etc
        return {
          statusCode: 409,
          body: JSON.stringify({message: 'There was some type of catastrophic error', error:e})
      }
   }
}

```

## GCP

- https://firebase.google.com/docs/functions

```js

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

exports.speedyhandler = functions.https.onRequest(
  async (req, res) => {
    await inst(req.body)
    res.status(200).send('ok')
  }
)
```