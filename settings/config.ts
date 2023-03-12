import { Speedybot, Config } from "speedybot-mini";

const botConfig: Config = {
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

const CultureBot = new Speedybot(botConfig);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["ping", "pong"], ($bot, msg) => {
  const { text } = msg;
  if (text === "ping") {
    $bot.send("pong");
  } else if (text === "pong") {
    $bot.send("ping");
  }
});

// Basic handler-- could be triggered by hi, let's say hi!!, yo!, hola!, etc
CultureBot.fuzzy(
  ["hi", "hello", "hey", "yo", "watsup", "hola"],
  async ($bot, msg) => {
    // Send a card with "chips"
    const card = $bot
      .dangerCard({
        title: "Speedybot-mini",
        subTitle:
          "speedybot-mini: a portable chat engine that you can deploy anywhere",
        chips: [
          { keyword: "alerts", label: "📱 Show alert types" },
          { keyword: "ping", label: "ping 🏓" },
          { keyword: "pong", label: "🏓 pong" },
          { keyword: "yo", label: "🔆 hi" },
          { keyword: "sendfiles", label: "🗂 files" },
        ],
        image:
          "https://github.com/valgaze/speedybot-mini/raw/deploy/docs/assets/logo.png?raw=true",
      })
      .setText(
        "💫 **[New Syntax](https://github.com/valgaze/speedybot-mini/blob/deploy/settings/config.ts)**"
      )
      .setText(
        "🔌 **[Websockets (no webhooks)](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/websockets)**"
      )
      .setText(
        "λ **[Deploy to AWS Lambda](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/websockets)**"
      )
      .setText(
        "💻 **[Deploy to traditioanl server](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/express-incoming-webhook)**"
      )
      .setText(
        "🦖 **[Deploy to Deno](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/deno)**"
      )
      .setText(
        "🔥 **[Deploy to Worker](https://github.com/valgaze/speedybot-mini/tree/deploy/examples/worker)**"
      )
      .setDetail(
        $bot
          .card()
          .setText("Other Resources")
          .setText(
            "📚 Read **[The API Docs](https://github.com/valgaze/speedybot-mini/blob/deploy/api-docs/classes/BotInst.md#methods)**"
          )
          .setText(
            "🔐 Read how to secure your webhooks **[The API Docs](https://github.com/valgaze/speedybot-mini/blob/deploy/docs/webhooks.md#webhook-secrets)**"
          )
          .setText(
            "🔧🤖 **[speedybot garage (bot admin ui)](https://codepen.io/valgaze/full/MWVjEZV)**"
          ),
        "Get Help 🚨"
      );

    await $bot.send(card);
    $bot.send(
      $bot.buildSpaceLink("6d124c80-f638-11ec-bc55-314549e772a9", "🗣 Get help!")
    );
  }
);

CultureBot.contains("kitchensink", async ($bot, msg) => {
  // Details here: https://github.com/valgaze/speedybot-mini/blob/deploy/api-docs/classes/BotInst.md

  await $bot.send(`## Kitchen Sink`);

  // $bot.translate
  $bot.send($bot.translate("cn", "greetings.welcome"));
  $bot.send($bot.translate("es", "greetings.welcome"));
  $bot.send(
    $bot.translate("DOESNTEXIST", "greetings.welcome", {}, "hi (fallback!)")
  );

  // Thread
  $bot.thread([
    $bot.card().setTitle("hello world!").setChips(["ping", "pong"]),
    "Pick one of the above!",
    "Come on do it!",
  ]);

  // DM text/cards to users
  $bot.dm(
    msg.author.id,
    $bot.card({
      title: "biscotti v biscotto",
      subTitle: "Learn the difference",
      url: "https://www.youtube.com/watch?v=6A8W77m-ZTw&t=102s",
      urlLabel: "Learn more 🍪",
    })
  );

  // Various handy

  // Stashcard: 'ephemeral' messages inside a card
  $bot.send(
    $bot.stashCard(
      `My super secret: *${$bot.rando()}*`,
      "Here is a special message"
    )
  );

  // Randomization/response variation with templating
  await $bot.sendRandom(["option a", "option b", "option c"]);

  const utterances = [
    `Heya how's it going $[name]?`,
    `Hi there, $[name]!`,
    `Hiya $[name]`,
    `What's new $[name]`,
    `Helllooo $[name]`,
  ];
  const template = {
    name: msg.author.displayName,
  };
  $bot.sendTemplate(utterances, template);

  // Send url
  $bot.sendURL(
    "https://github.com/valgaze/speedybot-mini/blob/deploy/api-docs/classes/BotInst.md"
  );

  // Display data
  $bot.sendJSON({ a: 1, b: 2, c: 3 }, "Here is some snippet data");

  // Trigger another text handler
  $bot.trigger("ping", msg);
  $bot.trigger("pong", msg);
});

// Special alert types
CultureBot.exact("alerts", async ($bot) => {
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

  // Banners (visually distinctive single-line messaging)
  $bot.send($bot.banner("Speedybot-mini", "sky")); // bot.skyCard({ title: "Speedybot-mini" }
  $bot.send($bot.banner("Speedybot-mini", "danger")); // bot.dangerCard({ title: "Speedybot-mini" }
  $bot.send($bot.banner("Speedybot-mini", "success")); // bot.skyCard({ title: "Speedybot-mini" }
  $bot.send($bot.banner("Speedybot-mini", "warning")); // bot.skyCard({ title: "Speedybot-mini" }
  $bot.send($bot.banner("Speedybot-mini", "yolo")); // randomize
});

// Can handle incoming files but also can *send* files to users
CultureBot.fuzzy(["files", "file"], async ($bot, msg) => {
  await $bot.send("## Files");

  // 1) File op1: Send a file from publically addressable URL
  const pdfURL = "https://speedybot.valgaze.com";
  $bot.sendDataFromUrl(pdfURL);

  // 2) Generate a json FILE from data
  await $bot.sendDataAsFile(msg, "json");

  // 3) Generate an HTML FILE from data
  const makeHTML = (prefix: string, trigger: any) => {
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
        ${JSON.stringify(trigger, null, 2)}
            </pre>
            </body>
            </html>`;
  };
  // Send HTML w/ dynamic data
  $bot.sendDataAsFile(
    makeHTML(`Here's your generated file, ${msg.author.displayName}`, msg),
    "html"
  );
});

// Take inpt from user
CultureBot.contains("healthcheck", ($bot) => {
  // Adapative Card: https://developer.webex.com/docs/api/guides/cards
  const card = $bot
    .card({
      title: "System is 👍",
      subTitle: "If you see this card, everything is working",
      image:
        "https://github.com/valgaze/speedybot-mini/blob/deploy/docs/assets/chocolate_chip_cookies.png?raw=true",
      url: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
      urlLabel: "Take a moment to celebrate",
      table: [[`Bot's Date`, new Date().toDateString()]],
    })
    .setInput(`What's on your mind?`)
    .setData({ mySpecialData: { a: 1, b: 2 } })
    .setChoices(["option a", "option b", "option c"]);

  $bot.send(card);
});

CultureBot.exact("$clear", ($bot) => $bot.clearScreen());
CultureBot.fuzzy(["help", "how do i"], ($bot, msg) => {
  const card = $bot
    .card({
      title: "Welcome to Culturebot!",
      subTitle: "Below are some commands you can run",
      chips: [
        { keyword: "alerts", label: "📱 Show alert types" },
        { keyword: "ping", label: "ping 🏓" },
        { keyword: "pong", label: "🏓 pong" },
        { keyword: "yo", label: "🔆 hi" },
        { keyword: "files", label: "🗂 files" },
        { keyword: "$clear", label: "🧹 Clear screen" },
      ],
    })
    .setText("**alerts**: Demonstration of new alert types in Speedybot")
    .setText(
      "**healthcheck**: Sends an Adaptive Card with an input field to the user"
    )
    .setText("**kitchensink**: Almost everything at once")
    .setText("**files**: Experiments with files using Speedybot")
    .setText(
      "**ping/pong**: A handler that says ping when the user says pong and vice versa"
    );

  $bot.send(card);
});

// Special Handlers
/*
CultureBot.nlu(async ($bot, msg, api) => {
  const res = await api(
    "https://www.nluservice.com",
    { data: msg.text },
    { method: "GET" }
  );
  const json = await res.text();
  console.log("##", json);
});
*/

// onSubmit
CultureBot.onSubmit(($bot, msg) => {
  $bot.send(`You sent ${JSON.stringify(msg.data.inputs)}`);
});

// Runs on file upload, can pass bytes to 3rd-party service
CultureBot.onFile(async ($bot, msg, fileData) => {
  $bot.send(
    `You uploaded '${fileData.fileName}' (${fileData.extension}, ${fileData.type})`
  );
  const snippetable = ["json", "txt", "csv"];
  if (snippetable.includes(fileData.extension)) {
    // Actual data (markdown preview available on fileData.markdownSnippet)
    $bot.sendSnippet(fileData.data);
  }
}).config({ matchText: true });
