import { Speedybot } from "speedybot-mini";
const CultureBot = new Speedybot("");
export default CultureBot;

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

// Specials: Regex, submissions, files

CultureBot.regex(new RegExp("x"), ($bot, msg) => {
  $bot.send(`Regex matched on this text:  ${msg.text}`);
});

CultureBot.onFile(($bot, msg, fileData) => {
  const { extension, fileName, type } = fileData;
  $bot.send(
    `You uploaded '${fileName}', a ${extension} file of type '${type}''`
  );
  // File data available under fileData.data
});
