import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ENVELOPES } from "speedybot-mini";
import CultureBot from "./config";
import { validateSignature } from "./validate_webhook";
import "cross-fetch/polyfill";
export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  // Check webhook secret
  const signature = event.headers["x-spark-signature"];
  const secret = process.env.secret; // webhook secret

  // attach token from process.env
  CultureBot.setToken(process.env.token as string);
  let data = {};
  if ("body" in event && event.body) {
    try {
      data = JSON.parse(event.body);
    } catch (e) {
      console.log("#Error with body", e);
    }
  }

  // Webhook "secret" check
  if (secret && signature) {
    const proceed = validateSignature(
      signature as string,
      secret as string,
      data
    );

    if (!proceed) {
      return {
        statusCode: 200,
        body: "Webhook secret rejected",
      };
    }
  }

  try {
    // Can extend bot based on route params or other conditions
    CultureBot.contains(["ping", "pong"], ($bot, msg) => {
      const { text } = msg;
      if (text === "ping") {
        $bot.send("pong");
      } else if (text === "pong") {
        $bot.send("ping");
      }
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
          $bot.translate(
            "DOESNTEXIST",
            "greetings.welcome",
            {},
            "hi (fallback!)"
          )
        );

        // Send a card with "chips"
        const card = $bot
          .dangerCard({
            title: "Speedybot-mini 2.0 Released!",
            subTitle:
              "speedybot-mini: a portable chat engine that runs anywhere",
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

    CultureBot.contains("$clear", ($bot) => $bot.clearScreen());

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

    CultureBot.noMatch(($bot, msg) =>
      $bot.send("Sorry, no match for " + msg.text)
    );

    if (CultureBot.isEnvelope(data)) {
      console.log("###\n");
      console.log(JSON.stringify(data, null, 2));
      console.log("\n###\n");

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
      CultureBot.every(($bot) => $bot.send("Ran for every!"));

      await CultureBot.processIncoming(data as ENVELOPES);
    }
  } catch (e) {
    return {
      statusCode: 200,
      //@ts-ignore
      body: JSON.stringify({
        msg: `There was an error`,
        error: e,
      }),
    };
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Speedybot: Your request was received at ${event.requestContext.time}.`,
  };
};
