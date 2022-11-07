// tl:dr: Add your tokens, save & deploy and set webhook url's here: https://codepen.io/valgaze/full/MWVjEZV
// 1) Create 3 bots, get 3 tokens, put below
// 2) Create an account on deno
// 3) Register webooks using deno baseURL/route_name for each bot
// Register webhook: https://codepen.io/valgaze/full/MWVjEZV

import { serve } from "https://deno.land/std/http/mod.ts";
import {
  Speedybot,
  finale,
} from "https://cdn.skypack.dev/speedybot-mini@2.0.2";

async function reqHandler(req: Request) {
  if (req.method === "GET") {
    return new Response(finale());
  }
  const json = await req.json();

  if (req.method === "POST") {
    const timestamp = new Date();

    const ezRoute = (url) => {
      const bot = {
        "/testbota1": {
          token: "__REPLACE__ME__",
          name: "testbota1@webex.bot",
          mods: (token) => {
            const bot1 = new Speedybot(token);

            bot1.every(($bot) =>
              $bot.send("This runs on every request on bot1")
            );

            bot1.contains(["hi", "whoareyou"], ($bot) =>
              $bot.send("I am test bot1 " + timestamp + req.url)
            );
            return bot1;
          },
        },
        "/testbota2": {
          token: "__REPLACE__ME__",
          name: "testbota2@webex.bot",
          mods: (token) => {
            const bot2 = new Speedybot(token);

            bot2.every(($bot) =>
              $bot.send("This runs on every request on bot2")
            );
            bot2.contains(["hi", "whoareyou"], ($bot) =>
              $bot.send("I am test bot2 " + timestamp + req.url)
            );
            return bot2;
          },
        },
        "/testbota3": {
          token: "__REPLACE__ME__",
          name: "bot3",
          mods(token) {
            const bot3 = new Speedybot(token);
            bot3.every(($bot) =>
              $bot.send("This runs on every request on bot3")
            );
            bot3.contains(["hi", "whoareyou"], ($bot) =>
              $bot.send("I am test bot3 " + timestamp + req.url)
            );
            return bot3;
          },
        },
      };

      const { pathname } = new URL(url);
      return bot[pathname] || null;
    };
    const res = ezRoute(req.url);

    if (res) {
      const { name, mods, token } = res;
      console.log("Running bot:", name);
      if (mods) {
        const bot = mods(token);
        await bot.processIncoming(json);
      }
    }
  }
  return new Response("Request handled");
}
serve(reqHandler, { port: 1337 });
