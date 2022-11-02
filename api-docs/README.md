speedybot-mini / [Exports](modules.md)

# 🏖 `speedybot-mini` super-fast "no-ops" conversation design infrastructure

```
╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔╦╗ ╦ ╦ ╔╗  ╔═╗ ╔╦╗
╚═╗ ╠═╝ ║╣  ║╣   ║║ ╚╦╝ ╠╩╗ ║ ║  ║
╚═╝ ╩   ╚═╝ ╚═╝ ═╩╝  ╩  ╚═╝ ╚═╝  ╩ mini
```

**serverless chat that actually works**

📚 [API Docs](https://github.com/valgaze/speedybot-mini/blob/deploy/api-docs/modules.md#classes)

Speedybot-mini is a portable chat engine that you can run almost anywhere

## Quickstarts

- **[speedybot garage 🔧🤖, manage webhooks/secrets/admin](https://codepen.io/valgaze/pen/MWVjEZV)**

- **[Deploy to Deno](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/deno)**

- **[Deploy to Worker](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/worker)**

- **[Deploy to Traditional Server](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/express-incoming-webhook)**

## Speedybot-mini

- 🌟 Zero External Dependencies 🌟
- Adds support **[tappable suggestion "chips"](#chips)**
- Includes **[SpeedyCard card builder](#speedycard)** (create rich **[Adaptive Cards](https://developer.webex.com/docs/api/guides/cards)** without wrangling JSON)
- Locale & i18n support
- Optimized for **[V8 Isolates](https://developers.cloudflare.com/workers/learning/how-workers-works/)** for milisecond response times (🥶 no more cold start problems 🥶)
- Runs on virtually any infrastructure-- servers, V8 isolates, containers, container-less, edge, etc

The era of manually writing "handlers" or matching text with RegEx's is coming to an end. In the future there will be far fewer "keyword" handlers and instead deeper integration with 3rd-party conversation services like **[Voiceflow](https://www.voiceflow.com/)**, **[Amazon Lex](https://aws.amazon.com/lex/)**, **[DialogFlow](https://cloud.google.com/dialogflow/docs)**

## Syntax

```sh
npm install speedybot-mini
```

**[See starter bot](./settings/config.ts)**

```ts
import { Speedybot } from "speedybot-mini";

// In a production environment use a secrets manager to pass in token
// Get a token: https://developer.webex.com/my-apps/new/bot
const botConfig = { token: "__REPLACE__ME__" };

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(botConfig);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!
// Match handlers based on user input like
CultureBot.contains("hi", async ($bot, msg) => {
  $bot.send(`You said '${msg.text}', ${msg.author.displayName}!`);
});

// Can also do Regex's
CultureBot.regex(new RegExp("x"), ($bot, msg) => {
  $bot.send(`Regex matched on this text:  ${msg.text}`);
});

// Special keywords: .onSubmit, .onFile, .onCamera, .every, .noMatch,
// Handle AdpativeCard submissions
CultureBot.onSubmit(($bot, msg) => {
  $bot.send(`You submitted ${JSON.stringify(msg.data.inputs)}`);
});

// Runs on file upload, can pass bytes to 3rd-party service
CultureBot.onFile(async ($bot, msg, fileData) => {
  $bot.send(`You uploaded '${fileData.fileName}'`);
  $bot.send(`snip: ${fileData.markdownSnippet}`);
  $bot.send(fileData.data);
}).config({ matchText: true });

// Runs like file-upload, but for images
CultureBot.onCamera(async ($bot, msg, fileData) => {
  $bot.send(`{oncamera} '${fileData.fileName}'`);
  $bot.send(`snip: ${fileData.markdownSnippet}`);
  $bot.send(fileData.data);
});

// Runs on EVERY input, kinda like middleware
// This is where you would interact with an NLU service like DialogFlow, Amazon Lex, Voiceflow, etc
CultureBot.every(async ($bot, msg) => {
  const { text } = msg;
  $bot.log(`.every handler ran with this text: '${text}'`);
}).config({
  skipList: ["$clear"],
});

// If no matched handlers
CultureBot.noMatch(($bot, msg) => {
  $bot.say(`Bummer, there was no matching handler for '${msg.text}`);
});
```

```ts
import Culturebot from "./config.ts";

// use .processIncoming to handle incoming requests
export default {
  async fetch(request: Request): Promise<Response> {
    const json = await request.json();

    // Do whatever checks/validation, processIncoming presumes it has good input
    const isEnvelope = CultureBot.isEnvelope(json);
    if (isEnvelope && request.method === "POST") {
      await CultureBot.processIncoming(json as ENVELOPES);
    }
    return new Response(finale());
  },
};
```

## SpeedyCard

ex. Tell the bot "sendcard" to get a card, type into the card & tap submit, catch submission using _<@submit>_ and echo back to user.

- Getting started with AdaptiveCards (https://developer.webex.com/docs/api/guides/cards) can be a bit cumbersome and error-prone

- SpeedyCard is a limited subset of AdaptiveCards with basic features with a focus on user interaction & simplicity (title, text, input box, menu-select, no "collapsable" sections, etc)

- Inspired a bit by SwiftUI: https://developer.apple.com/xcode/swiftui/

![sb](https://github.com/valgaze/speedybot-mini/blob/deploy/docs/assets/demo_sendcard.gif)

<details>
<summary>(Tap to see code)</summary>

```ts
import { Speedybot } from "speedybot-mini";

// In a production environment use a secrets manager to pass in token
// Get a token: https://developer.webex.com/my-apps/new/bot
const botConfig = { token: "__REPLACE__ME__" };

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(botConfig);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!
// Match handlers based on user input like
CultureBot.contains("hi", async ($bot, msg) => {
  $bot.send(`You said '${msg.text}', ${msg.author.displayName}!`);
});

// Handle/capture AdpativeCard submissions
CultureBot.onSubmit(($bot, msg) => {
  $bot.send(`You submitted ${JSON.stringify(msg.data.inputs)}`);
});

// send a card

CultureBot.contains("sendcard", async ($bot, msg) => {
  const cardPayload = $bot
    .card()
    .setTitle("System is 👍")
    .setSubtitle("If you see this card, everything is working")
    .setImage("https://i.imgur.com/SW78JRd.jpg")
    .setInput(`What's on your mind?`)
    .setTable([[`Bot's Time`, new Date().toTimeString()]])
    .setData({ mySpecialData: { a: 1, b: 2 } })
    .setUrl(
      "https://www.youtube.com/watch?v=3GwjfUFyY6M",
      "Take a moment to celebrate"
    );
});
```

</details>

## Chips

ex. Tell the bot "chips" to get a card with tappable "chips"

![sb](https://github.com/valgaze/speedybot-mini/blob/deploy/docs/assets/demo_chips.gif)

<details>
<summary>(Tap to see code)</summary>

```ts
import { Speedybot } from "speedybot-mini";

// In a production environment use a secrets manager to pass in token
// Get a token: https://developer.webex.com/my-apps/new/bot
const botConfig = { token: "__REPLACE__ME__" };

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(botConfig);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!
// Match handlers based on user input like
CultureBot.contains("hi", async ($bot, msg) => {
  $bot.send(`You said '${msg.text}', ${msg.author.displayName}!`);
});

// Handle/capture AdpativeCard submissions (non-chip submission)
CultureBot.onSubmit(($bot, msg) => {
  $bot.send(`You submitted ${JSON.stringify(msg.data.inputs)}`);
});

CultureBot.contains(["ping", "pong"], ($bot, msg) => {
  const { text } = msg;
  if (text === "ping") {
    $bot.send("pong");
  } else if (text === "pong") {
    $bot.send("ping");
  }
});

// send a card with tappable chips

CultureBot.contains("chips", async ($bot, msg) => {
  $bot.send(
    $bot
      .card()
      .setChips([
        "hey",
        "ping",
        { label: "say the phrase pong", keyword: "pong" },
      ])
  );
});
```

</details>
