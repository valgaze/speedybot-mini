// Add your token, save & deploy and save webhook
// Register webhook: https://codepen.io/valgaze/full/MWVjEZV
import { serve } from "https://deno.land/std/http/mod.ts";
import {
  Speedybot,
  finale,
} from "https://cdn.skypack.dev/speedybot-mini@2.0.1";

const botConfig = {
  token: "__REPLACE__ME__",
  locales: {
    es: {
      greetings: {
        welcome: "hola!!",
      },
    },
    cn: {
      greetings: {
        welcome: "你好",
      },
    },
  },
};

// In a production environment use a secrets manager to pass in token

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(botConfig);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

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

CultureBot.contains(
  ["hi", "hello", "hey", "yo", "watsup", "hola"],
  async ($bot, msg) => {
    const utterances = [
      `Heya how's it going $[name]?`,
      `Hi there, $[name]!`,
      `Hiya $[name]!`,
      `What's new $[name]?`,
      `Helllooo $[name]!`,
    ];
    const template = {
      name: msg.author.displayName,
    };
    $bot.sendTemplate(utterances, template);

    // $bot.translate
    $bot.send($bot.translate("cn", "greetings.welcome"));
    $bot.send($bot.translate("es", "greetings.welcome"));
    $bot.send(
      $bot.translate("DOESNTEXIST", "greetings.welcome", {}, "hi (fallback!)")
    );

    // Send a card with "chips"
    const card = $bot
      .dangerCard({
        title: "Speedybot-mini 2.0 Released!",
        subTitle: "speedybot-mini: a portable chat engine that runs anywhere",
        chips: [
          { keyword: "alert", label: "📱 Show alert types" },
          { keyword: "ping", label: "ping 🏓" },
          { keyword: "pong", label: "🏓 pong" },
          { keyword: "yo", label: "🔆 hi" },
          { keyword: "sendfiles", label: "🗂 files" },
        ],
        image: "https://i.imgur.com/LybLW7J.gif",
      })
      .setData({ specialData: new Date().toDateString() })
      .setText(
        "🌟 **[See Source Code](https://github.com/valgaze/speedybot-mini)**"
      )
      .setText(
        "💫 **[New Syntax](https://github.com/valgaze/speedybot-mini/blob/deploy/settings/config.ts)**"
      )
      .setText(
        "**📚 [API Docs](https://github.com/valgaze/speedybot-mini/blob/deploy/api-docs/modules.md#classes)**"
      )
      .setText(
        "🦖 **[Deploy to Deno](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/deno)**"
      )
      .setText(
        "🔥 **[Deploy to Worker](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/worker)**"
      )
      .setText(
        "💻 **[Deploy to Traditional Server](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/express-incoming-webhook)**"
      )
      .setText(
        "🔧🤖 **[speedybot garage](https://codepen.io/valgaze/full/MWVjEZV)**"
      )
      .setInput("Put any feedback here", { id: "feedbackData" })
      .setDetail(
        $bot
          .card()
          .setText("Other Resources")
          .setText(
            "📚 Read **[The API Docs](https://github.com/valgaze/speedybot-mini/blob/deploy/api-docs/classes/BotInst.md#methods)**"
          ),
        "Get Help🚨"
      );

    await $bot.send(card);
    $bot.send(
      `**[🗣 Get help](webexteams://im?space=6d124c80-f638-11ec-bc55-314549e772a9)**`
    );
  }
);

// Example of matching on a "command", /add large strawberry ice-cream
CultureBot.contains("/add", ($bot, msg) => {
  const snipCommand = (commandPrefix: string, msg: string) => {
    return msg
      .toLowerCase()
      .replace(commandPrefix.toLowerCase(), "")
      .trim()
      .split(" ");
  };
  const pieces = snipCommand("/add", msg.text);
  $bot.send(`These are the arguments: ${pieces}`);
});

// Can also do Regex's
CultureBot.regex(new RegExp("x"), ($bot, msg) => {
  $bot.send(`Regex matched on this text:  ${msg.text}`);
});

CultureBot.contains(["ping", "pong"], ($bot, msg) => {
  const { text } = msg;
  if (text === "ping") {
    $bot.send("pong");
  } else if (text === "pong") {
    $bot.send("ping");
  }
});

CultureBot.contains(["alert", "alerts"], async ($bot) => {
  const danger = $bot
    .dangerCard({
      title: "⛔️DANGER-- do not do that!⛔️",
      subTitle: "There is a very important reason not to do that",
    })
    .setDetail(
      $bot.dangerCard({
        title: "Timeline",
        table: [
          ["🌟", "Incident details 1"],
          ["💫", "Incident details 2"],
          ["🌴", "Incident details 3"],
        ],
      }),
      "Incident Details"
    );
  await $bot.send(danger);

  const warning = $bot.warningCard({
    title:
      "⚠️Warning-- you should consider carefully if you want to do that!⚠️",
    subTitle:
      "There is a very important reason to slow down and consider if you want to do that...or not",
    chips: ["ping", "pong"],
  });
  await $bot.send(warning);

  const success = $bot.successCard({
    title: "🌟You did it!🎉",
    subTitle: "Whatever you did, good at job at doing it",
    chips: ["ping", "pong"],
  });
  await $bot.send(success);

  const sky = $bot.skyCard({
    title: "☁️You're doing it☁️",
    subTitle: "Whatever you're doing, do it more",
    chips: ["ping", "pong"],
  });
  await $bot.send(sky);

  const b = $bot.skyCard({ title: "Speedybot-mini" });
  const r = $bot.dangerCard({ title: "Speedybot-mini" });
  const g = $bot.successCard({ title: "Speedybot-mini" });
  const y = $bot.warningCard({ title: "Speedybot-mini" });
  await $bot.send(b);
  await $bot.send(r);
  await $bot.send(g);
  await $bot.send(y);
});

CultureBot.contains(["sendfile", "sendfiles"], async ($bot, msg) => {
  // Files
  // 1) File op1: Send a file from publically addressable URL
  const pdfURL = "https://speedybot.valgaze.com";
  $bot.sendDataFromUrl(pdfURL);

  // 2) Generate a json FILE from data
  await $bot.sendDataAsFile(msg, "json");

  // 3) Generate an HTML FILE from data
  const makeHTML = (prefix: string, msg: any) => {
    return `
          <html>
          <head>
          <title>${prefix}</title>
          </head>
          <body>
          <fieldset>
          <label> 
          <h1>${prefix}</h1>
          </label>
          </fieldset>
          <hr>
          <pre>
      ${JSON.stringify(msg, null, 2)}
          </pre>
          </body>
          </html>`;
  };
  // Send HTML w/ dynamic data
  $bot.sendDataAsFile(
    makeHTML(`Here's your generated file, ${msg.author.firstName}`, msg),
    "html"
  );
});
CultureBot.contains("$clear", ($bot) => $bot.clearScreen());

// Special keywords: .onSubmit .onFile, .onCamera, every, .noMatch

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

// Runs on file-upload, but for images
// CultureBot.onCamera(async ($bot, msg, fileData) => {
//   $bot.send(`{oncamera} '${fileData.fileName}'`);
//   $bot.send(`snip: ${fileData.markdownSnippet}`);
//   $bot.send(fileData.data);
// });

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

async function reqHandler(req: Request) {
  if (req.method === "GET") {
    return new Response(finale());
  }
  const json = await req.json();

  console.log("incoming", json);
  const proceed = CultureBot.isEnvelope(json);
  if (proceed && req.method === "POST") {
    CultureBot.processIncoming(json);
  }
  return new Response("Request handled");
}
serve(reqHandler, { port: 1337 });
