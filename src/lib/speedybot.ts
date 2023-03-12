import {
  ENVELOPES,
  Message_Details,
  AA_Details,
  File_Details,
  FileConfig,
  SpeedyFile,
  DETAILS,
  SelfData,
  RequestTypes,
  RootTrigger,
  MsgHandler,
  AAHandler,
} from "./payloads.types";
import {
  API,
  peekFile,
  CoreMakerequest,
  makeRequest as RequesterFunc,
  constants,
} from "./common";
import { BotConfig, BotInst, WebhookBot } from "./bot";
import { SpeedyCard } from "./cards";

export type Config = {
  token?: string;
  features?: {
    camera?: {
      files: string[];
    };
    files: FileConfig;
    catchAll: {
      skipList: string[];
    };
  };
  locales?: {
    [localeName: string]: {
      [key: string]: any;
    };
  };
  helpContent?: { helpText: string; label: string }[];
  fallbackText?: string; // tie this to locale?
};

export type GenericHandlerFunc<T = any> = (
  $bot: BotInst,
  msg: any
) => Promise<T | void> | T;

export type FileHandlerFunc<F = any> = (
  $bot: BotInst,
  msg: RootTrigger<File_Details>,
  fileData: SpeedyFile<F>
) => Promise<void> | void;

export type SubmitHandler = (
  $bot: BotInst,
  msg: AAHandler
) => Promise<void> | void;

export type NLUHandlerFunc<F = any> = (
  $bot: BotInst,
  msg: RootTrigger<Message_Details> & { text: string },
  api: CoreMakerequest
) => Promise<void> | void;

type Secrets<T extends string> = Record<T, string>;

export class Speedybot<T extends string = never> {
  private secrets: Partial<Secrets<T>> = {};

  /**
   * Add a secret to your Speedybot bot instance. Note bot tokens are special are are still set by {@link setToken}
   * **Note:** Once you add a secret it is accessible on the instance so be careful
   *
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * type MySecrets = 'special_token1' | 'special_token2'
   *
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // Add secret (can happen anytime to keep bots portable)
   *
   * CultureBot.addSecret('special_token1', 'xxx-yyy')
   * CultureBot.getSecret('special_token1') // 'xxx-yyy'
   *
   * CultureBot.addSecrets({'special_token2':'aaa-bbb'})
   * CultureBot.getSecret('special_token2') // 'aaa-bbb'
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  $bot.send('This is the hi greeting handler!')
   * })
   *
   * CultureBot.contains('trigger', async ($bot, msg) => {
   *  $bot.send('About to trigger the hi trigger')
   *  $bot.trigger('hi', msg)
   * })
   *
   * ```
   */
  addSecret<K extends T>(key: K, value: string): void {
    this.secrets[key] = value;
  }
  /**
   * Add a several secrets at once to your Speedybot bot instance. Note bot tokens are special are are still set by {@link setToken}
   * **Note:** Once you add a secret it is accessible on the instance so be careful
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * type MySecrets = 'special_token1' | 'special_token2'
   *
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // Add secret (can happen anytime to keep bots portable)
   *
   * CultureBot.addSecrets({'special_token1': 'xxx-yyy', 'special_token2':'aaa-bbb'})
   * CultureBot.getSecret('special_token1') // 'xxx-yyy'
   * CultureBot.getSecret('special_token2') // 'aaa-bbb'
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  $bot.send('This is the hi greeting handler!')
   * })
   *
   * CultureBot.contains('trigger', async ($bot, msg) => {
   *  $bot.send('About to trigger the hi trigger')
   *  $bot.trigger('hi', msg)
   * })
   *
   * ```
   */
  addSecrets(secrets: Partial<Secrets<T>>): void {
    this.secrets = { ...this.secrets, ...secrets };
  }

  /**
   * Retrieve a secret set on your Speedybot bot instance. Note bot tokens are special are are still set by {@link setToken}
   * **Note:** Once you add a secret it is accessible on the instance so be careful
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * type MySecrets = 'special_token1' | 'special_token2'
   *
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // Add secret (can happen anytime to keep bots portable)
   *
   * CultureBot.addSecret('special_token1', 'xxx-yyy')
   * CultureBot.getSecret('special_token1') // 'xxx-yyy'
   *
   * CultureBot.addSecrets({'special_token2':'aaa-bbb'})
   * CultureBot.getSecret('special_token2') // 'aaa-bbb'
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  $bot.send('This is the hi greeting handler!')
   * })
   *
   * CultureBot.contains('trigger', async ($bot, msg) => {
   *  $bot.send('About to trigger the hi trigger')
   *  $bot.trigger('hi', msg)
   * })
   *
   * ```
   */
  public getSecret<K extends T>(key: K): string | undefined {
    return this.secrets[key];
  }

  public IncomingWebhooks = () => WebhookBot({ token: this.getToken() });

  private _config: Config = {
    token: "",
    features: {
      camera: {
        files: [],
      },
      files: {
        matchText: false,
        excludeFiles: [],
      },
      catchAll: {
        skipList: [],
      },
    },
  };

  constructor(
    config?: Config | string,
    private makeRequest: CoreMakerequest = RequesterFunc
  ) {
    if (typeof config === "string") {
      this._config.token = config;
    } else {
      this._config = Object.assign(this._config, config);
    }
  }

  public exposeToken() {
    return this._config.token || "";
  }
  private rootList: RootList = [];
  public FileHandler: FileHandlerFunc | null = null;
  private handlers: {
    camera: null | GenericHandlerFunc;
    file: null | GenericHandlerFunc;
    submit: null | GenericHandlerFunc;
    NO_MATCH: null | GenericHandlerFunc;
    ALL: null | GenericHandlerFunc;
    [key: string]: GenericHandlerFunc | null;
  } = {
    camera: null,
    file: null,
    submit: null,
    nlu: null,
    NO_MATCH: null,
    ALL: null,
  };
  private nluHandler: null | NLUHandlerFunc = null;

  private checkStrings(
    check: string,
    incoming: string,
    flag?: { exact?: boolean; fuzzy?: boolean }
  ) {
    const { exact = false, fuzzy = false } = flag || {};
    if (exact) return check === incoming;
    if (fuzzy) return incoming.toLowerCase().includes(check.toLowerCase());
    const [first] = incoming.toLowerCase().split(" "); // Check first word of input phrases for "commands" pattern, ex /check order me a new coffee
    return first === check.toLocaleLowerCase();
  }

  /**
   *
   * Register a handler that "fuzzily" matches input from a user
   *
   * Any fuzzy matches occur **anywhere** in the input from the user (if you want only the 1st word see {@link Speedybot.contains})
   *
   *
   * ```ts
   *
   * // This agent will match for ex.  hi, hi!!, here is a sentence hi and bye
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.fuzzy(["hi", "hey"], async ($bot, msg) => {
   *   $bot.send('You matched!')
   * })
   * ```
   */
  public fuzzy(keyword: string | string[], cb: MsgHandler) {
    // Aliases to regex
    const nextIdx = this.rootList.length;
    // 1) attach handlers
    this.handlers[nextIdx] = cb;

    // 2) attach to search
    if (typeof keyword === "string") {
      this.rootList.push({ FUZZY: keyword.toLowerCase() });
    } else {
      const payload = keyword.map((kw) => {
        return { FUZZY: kw.toLowerCase() };
      });
      //@ts-ignore
      this.rootList.push(payload);
    }
  }

  /**
   *
   * Register a handler thats matches on a string or list of strings
   *
   *  Note: This will match if the target phrase is the 1st or only word in a sentence
   *
   * **Important:** If you want to match on the input phrase located *anywhere* in an input phrase,
   * use .fuzzy. If .fuzzy and .contains contain the same matching word, the first registered handler will take precedence
   * Any fuzzy matches occur **anywhere** in the input from the user (if you want only the 1st word see .contains)
   *
   *
   * ```ts
   *
   * // This agent will match for ex.  hi, hey how's it going, hey
   * // Will not match: hi!!, heya how are you?
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *   $bot.send('You matched!')
   * })
   * ```
   */
  public contains(keyword: string | string[], cb: MsgHandler) {
    // Aliases to regex
    const nextIdx = this.rootList.length;
    // 1) attach handlers
    this.handlers[nextIdx] = cb;
    // 2) attach to search
    if (typeof keyword === "string") {
      this.rootList.push(keyword.toLowerCase());
    } else {
      this.rootList.push(keyword.map((kw) => kw.toLowerCase()));
    }
  }

  /**
   *
   * Register a handler thats matches on a string **exactly**
   *
   *  Note: This will match if the target phrase has a case-sensitive match
   *
   *
   * ```ts
   *
   * // This agent will match for only 'Hi'
   * // Will not match: hi, hi!!, heya how are you?
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.exact("hi", async ($bot, msg) => {
   *   $bot.send('You matched!')
   * })
   * ```
   */
  public exact(keyword: string, cb: MsgHandler) {
    // Aliases to regex
    this.handlers[this.rootList.length] = cb;
    this.rootList.push({ EXACT: keyword });
  }

  /**
   *
   * 🌟SPECIAL🌟 Conversational Design convenience handler
   *
   * Use this handler to send user input to a NLP/NLU
   *
   * Any registered keywords handled with your agent will be ignored and not sent to the NLU system
   *
   * ```ts
   *
   * // This agent will match for ping, pong, anything else will be sent to a
   * // 3rd-party service for content and conversation design
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["ping","pong"], async ($bot, msg) => {
   *   $bot.send('You matched!')
   * })
   *
   *
   * CultureBot.nlu("hi", async ($bot, msg, api) => {
   *   const payload = await api('https://www.nluservice.com', { text: msg.text }, )
   *   const res = await payload.text()
   *   $bot.send(`Response: ${text}`)
   * })
   *
   * ```
   */
  public nlu(cb: NLUHandlerFunc) {
    this.nluHandler = cb;
  }

  /**
   *
   * Register a handler thats matches based on a Regular Expression
   *
   * ```ts
   *
   * // This agent will match for only 'Hi'
   * // Will not match: hi, hi!!, heya how are you?
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.regex(new RegExp('x'), async ($bot, msg) => {
   *   $bot.send('You matched because you said a word containing x!')
   * })
   * ```
   *
   */
  public regex(rx: RegExp, cb: MsgHandler) {
    this.handlers[this.rootList.length] = cb;
    this.rootList.push(rx);
  }

  /**
   *
   * Register a handler when there is no matching handler for a user's input
   *
   * If you're not using an NLU system, it's a good idea to acknowledge a user's
   * request isn't servicable rather than leaving them hanging
   *
   * ```ts
   *
   * // This agent will match for only 'Hi'
   * // Will not match: hi, hi!!, heya how are you?
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.noMatch(async ($bot, msg) => {
   *   $bot.send(`Bummer, no match for ${msg.text}`)
   * })
   * ```
   *
   */
  noMatch(handler: MsgHandler) {
    this.handlers["NO_MATCH"] = handler;
  }

  /**
   *
   * Register a handler that runs on **EVERY** message sent to an agent
   * Note: You can optionally pass in a list of keywords to skip
   *
   * ```ts
   *
   * // This agent will match for only 'Hi'
   * // Will not match: hi, hi!!, heya how are you?
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   *
   * CultureBot.contains(['bingo', 'bongo'], ($bot, msg) => {
   *  if (msg.text === 'bingo') {
   *    $bot.send('bongo')
   *  } else {
   *    $bot.send('bingo')
   *  }
   * })
   *
   * // Run on every input except the words 'bingo' and 'bongo'
   * CultureBot.every(async ($bot, msg) => {
   *   $bot.send('You matched because you said a word containing x!')
   * }).config({skipList: ['bingo', 'bongo']})
   *
   * ```
   *
   */
  every(handler: MsgHandler, skipList: string[] = []) {
    this.handlers["ALL"] = handler;
    if (skipList.length) {
      skipList.forEach((skip) =>
        this._config.features?.catchAll.skipList.push(skip)
      );
    }
    const ref = this;
    return {
      config(catchallConfig: { skipList?: string[] }) {
        if (catchallConfig.skipList && catchallConfig.skipList.length) {
          catchallConfig.skipList.forEach((skip) =>
            ref._config.features?.catchAll.skipList.push(skip)
          );
        }
      },
    };
  }

  private setConfig<T = any>(route: string, data: T) {
    if (this._config && this._config.features) {
      this._config.features[route] = data;
    }
  }

  /**
   * Camera handler-- will trigger by default for png, jpeg, & jpg
   * @param handler
   *
   * ```ts
   * import { Speedybot } from "speedybot-mini";
   * // 1) Initialize your bot
   * const CultureBot = new Speedybot("__REPLACE__MEE__");
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // Add a camera handler
   * CultureBot.onCamera(($bot, msg, fileData) => {
   *    const { fileName, extension, type } = fileData;
   *    $bot.send(`You sent a photo: ${fileName} ${extension} ${type}`);
   *    // file data available under fileData.data
   * });
   * ```
   */
  public onCamera(handler: FileHandlerFunc) {
    this.setHandler("camera", handler);
  }

  private setHandler(handlerType: string, handler) {
    this.handlers[handlerType] = handler;
  }

  /**
   *
   * Register a handler when a user uploads a file to an agent
   *
   * With optional confi
   * - matchText: boolean-- should any text attached to file upload also be processed? (default false)
   * - excludeFiles: string[]-- any files not to exclude from handling
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.onFile(async ($bot, msg, fileData) => {
   *    const { fileName, extension, type } = fileData;
   *    $bot.send(`You sent a file: ${fileName} ${extension} ${type}`);
   *    // file data available under fileData.data
   * }).config({matchText: true})
   *
   *
   * ```
   *
   */
  onFile(handler: FileHandlerFunc) {
    this.setHandler("file", handler);
    const ref = this;
    return {
      config(fileConfig: FileConfig) {
        if (ref._config.features !== undefined) {
          ref._config.features.files = Object.assign(
            ref._config.features?.files || {},
            fileConfig
          );
        }
      },
    };
  }

  /**
   *
   * Register a handler when a user sends data from an Adaptive Card. Any attached data will be available under `msg.data.inputs`
   *
   *
   * In the example below this is the data available on card submission: `{"cardName":"mySpecialCard7755","inputData":"My opinion is 123"}`:
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains("card", ($bot) => {
   *  $bot.send('Here is a card to share your opinion')
   *  $bot.send(
   *  $bot
   *    .card({ title: "Here is a card" })
   *    .setData({ cardName: "mySpecialCard7755" })
   *    .setInput("What is your opinion?")
   *  );
   *
   * })
   *
   * CultureBot.onSubmit(async ($bot, msg, fileData) => {
   *   $bot.send(`You submitted ${JSON.stringify(msg.data.inputs)}`);
   * })
   * ```
   *
   */
  onSubmit(handler: AAHandler) {
    this.setHandler("submit", handler);
    const ref = this;
    return {
      config(fileConfig: FileConfig) {
        ref.setConfig("files", fileConfig);
      },
    };
  }

  setWelcome(handler: string | SpeedyCard) {}

  detectType(envelope: ENVELOPES): RequestTypes {
    let type;
    if (envelope.resource === "messages") {
      if ("files" in envelope.data && envelope.data.files?.length) {
        const { files = [] } = envelope.data;
        if (files && files.length) {
          type = "FILE";
        }
      } else {
        type = "TEXT";
      }
    }
    if (envelope.resource === "attachmentActions") {
      type = "AA";
    }
    return type as RequestTypes;
  }

  async processIncoming(
    envelope: ENVELOPES
  ): Promise<{ incomingProcessed: boolean }> {
    const type = this.detectType(envelope);
    const { personId, roomId } = envelope.data;
    const isHuman = await this.isHuman(personId);

    if (!isHuman) return { incomingProcessed: true }; // <-- hmmm, later we should think about bots talking to other bots
    const { author, details } = await this.buildDetails(type, envelope);
    const botTrigger: RootTrigger = {
      id: details.id,
      authorId: personId,
      data: details,
      author,
    };

    const bot_config: BotConfig = {
      token: this.getToken(),
      roomId: roomId,
      locales: this._config.locales,
      SpeedybotInst: this,
    };

    if (type === "TEXT" || type === "FILE") {
      const isGroup = "roomType" in details && details.roomType !== "direct";
      if (type === "FILE") {
        if ("files" in envelope.data) {
          const { files } = envelope.data;
          const [url] = files as string[];
          const botInst = new BotInst(bot_config, this.makeRequest);

          // Do a peek
          const res = await botInst.getFile(url);
          const { extension } = res;
          if (this.handlers.camera) {
            const formats = this._config.features?.camera?.files || [];
            const photos = ["png", "jpg", "jpeg", ...formats];
            if (photos.includes(extension)) {
              const camHandler = this.handlers.camera as FileHandlerFunc;
              if (camHandler) {
                await camHandler(botInst, botTrigger, res);
              }
            } else {
              const handler: FileHandlerFunc = this.handlers
                .file as FileHandlerFunc;
              const exclusionList =
                this._config.features?.files.excludeFiles || [];
              if (handler && !exclusionList.includes(extension)) {
                await handler(botInst, botTrigger, res);
              }
            }
          } else if (this.handlers.file) {
            const handler: FileHandlerFunc = this.handlers
              .file as FileHandlerFunc;
            const exclusionList =
              this._config.features?.files.excludeFiles || [];
            if (handler && !exclusionList.includes(extension)) {
              await handler(botInst, botTrigger, res);
            }
          }
        }
      }
      const { text } = details as Message_Details;

      const doText =
        text && (type === "TEXT" || this._config.features?.files.matchText);

      // Process text
      if (doText) {
        // Trim bot username in group rooms
        const tidyText = isGroup ? text.split(" ").slice(1).join(" ") : text;
        const handler = this.processText(tidyText);
        if (handler) {
          const botInst = new BotInst(bot_config, this.makeRequest);
          await handler(botInst, { ...botTrigger, text });
        }

        // Run catchall handler
        const catchall = this.handlers.ALL;
        if (
          catchall &&
          !this._config.features?.catchAll.skipList.includes(text)
        ) {
          await catchall(new BotInst(bot_config), { ...botTrigger, text });
        }

        const nlu = this.nluHandler;
        // If any words are registered, don't send to NLU
        const skip = this.checkList(text) > -1;

        if (nlu && !skip) {
          await nlu(
            new BotInst(bot_config),
            { ...botTrigger, text },
            this.makeRequest
          );
        }
      }
    }

    if (type === "AA") {
      const handler = this.processSubmit(details as AA_Details);
      if (handler) {
        const botInst = new BotInst(bot_config, this.makeRequest);
        await handler(botInst, {
          ...botTrigger,
          ...("inputs" in details &&
            details.inputs.chip_action && {
              text: details.inputs.chip_action,
            }),
        });

        if ("inputs" in details && details.inputs.chip_action) {
          const text = details.inputs.chip_action;
          const catchall = this.handlers.ALL;
          if (
            catchall &&
            !this._config.features?.catchAll.skipList.includes(text)
          ) {
            await catchall(new BotInst(bot_config), { ...botTrigger, text });
          }
        }
      }
    }
    return {
      incomingProcessed: true,
    };
  }

  processSubmit(details: AA_Details) {
    const data = details.inputs;
    if ("chip_action" in data) {
      const text = data.chip_action;
      return this.processText(text);
    }

    if (constants.actionKeyword in data) {
      this.actionHandler(details);
      return null;
    }

    return this.handlers.submit;
  }

  // if chip, rejigger and use this.process(text)
  /**
   * If worst case (user enters text
   *  and we need to search for it)
   * Check the list and find a 1-1 match or "contains"
   *
   * Note: All queries are lower-cased
   *
   * @param incoming
   *
   *
   */
  processText(incoming: string = "", skipNoMatchFallback = false) {
    const target = this.checkList(incoming);
    // if catchall (useful for NLU) runs
    if (target >= 0) {
      return this.handlers[target] &&
        typeof this.handlers[target] === "function"
        ? this.handlers[target]
        : null;
    } else if (this.handlers["NO_MATCH"]) {
      return typeof this.handlers["NO_MATCH"] === "function" &&
        !skipNoMatchFallback
        ? this.handlers["NO_MATCH"]
        : null;
    }
    return null;
  }

  /**
   * Returns look up index of matching handler if one exists
   * @param incoming
   * @returns
   */
  private checkList(incoming = ""): number {
    let target = -1;
    this.rootList.forEach((item, idx) => {
      let match = false;
      if (typeof item === "string") {
        match = this.checkStrings(item, incoming);
      }
      if (typeof item === "object" && "EXACT" in item) {
        const { EXACT } = item;
        match = this.checkStrings(EXACT, incoming, { exact: true });
      }
      if (typeof item === "object" && "FUZZY" in item) {
        const { FUZZY } = item;
        match = this.checkStrings(FUZZY, incoming, { fuzzy: true });
      }

      // Slowwwwwww
      if (item instanceof RegExp) {
        match = item.test(incoming.toLowerCase());
      }

      if (match && target < 0) {
        target = idx;
      }

      // handle tedious multiple-value case
      if (Array.isArray(item)) {
        item.forEach((kw) => {
          if (target < 0) {
            if (typeof kw === "string") {
              match = this.checkStrings(kw, incoming);
            } else if (kw instanceof RegExp) {
              match = kw.test(incoming.toLowerCase());
            } else if ("EXACT" in kw) {
              const { EXACT } = kw;
              match = this.checkStrings(EXACT, incoming, { exact: true });
            } else if ("FUZZY" in kw) {
              const { FUZZY } = kw;
              match = this.checkStrings(FUZZY, incoming, { fuzzy: true });
            }
            if (match) {
              target = idx;
            }
          }
        });
      }
    });
    return target;
  }

  public async actionHandler(details: AA_Details) {
    const root = details.inputs;
    const { speedybot_action = "" } = root;
    if (speedybot_action === "delete") {
      const { messageId } = details;
      await this.deleteMessage(messageId);
    }
    // others...
  }

  private async deleteMessage(msgId: string) {
    const url = `${API.deleteMessage}/${msgId}`;
    const res = await this.makeRequest(
      url,
      {},
      {
        token: this.getToken(),
        method: "DELETE",
      }
    );
    return res;
  }

  /**
   * Add a bot token used to authenticate to APIs
   *
   * ## Example
   *
   * ```ts
   *
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * CultureBot.exposeToken() // '__REPLACE__ME__'
   *
   * CultureBot.setToken('__REPLACE__ME__NEW_TOKEN!')
   *
   *  CultureBot.exposeToken() // __REPLACE__ME__NEW_TOKEN
   * // Add secret (can happen anytime to keep bots portable)
   *
   * CultureBot.addSecret('special_token1', 'xxx-yyy')
   * CultureBot.getSecret('special_token1') // 'xxx-yyy'
   *
   * CultureBot.addSecrets({'special_token2':'aaa-bbb'})
   * CultureBot.getSecret('special_token2') // 'aaa-bbb'
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  $bot.send('This is the hi greeting handler!')
   * })
   *
   * CultureBot.contains('trigger', async ($bot, msg) => {
   *  $bot.send('About to trigger the hi trigger')
   *  $bot.trigger('hi', msg)
   * })
   *
   * ```
   */
  public setToken(token: string) {
    this._config.token = token;
  }

  public getToken(): string {
    return this._config?.token as string;
  }

  public async buildDetails(
    type: RequestTypes,
    envelope: ENVELOPES
  ): Promise<{
    author: SelfData;
    details: Message_Details | File_Details | AA_Details;
  }> {
    const [author, data] = await Promise.all([
      this.getAuthor(envelope.data.personId),
      this.getData(type, envelope),
    ]);
    return {
      author,
      details: data,
    };
  }

  private async getAuthor(personId: string) {
    const url = `${API.getPersonDetails}/${personId}`;
    const res = await this.makeRequest(
      url,
      {},
      {
        method: "GET",
        token: this.getToken(),
      }
    );
    const json = res ? await res.json() : {};
    return json;
  }

  private async isHuman(personId: string, fullPayload = false) {
    const data = await this.getSelf();
    const { id } = data;
    if (fullPayload) {
      return data;
    }
    return id !== personId;
  }

  private async getSelf(): Promise<SelfData> {
    const url = API.getSelf;
    const res = (await this.makeRequest(
      url,
      {},
      {
        method: "GET",
        token: this.getToken(),
      }
    )) as Response;
    const json = (await res.json()) as SelfData;
    return json;
  }

  async getData(
    type: RequestTypes,
    envelope: ENVELOPES
  ): Promise<Message_Details | AA_Details | File_Details> {
    let url = API.getMessage_Details;
    if (type === "AA") {
      url = API.getAttachmentDetails;
    }
    const { data } = envelope;
    const { id } = data;
    url = `${url}/${id}`;
    const init = {
      method: "GET",
      token: this.getToken(),
    };
    const res = (await this.makeRequest(url, {}, init)) as Response;
    const json = await res.json();
    if (type === "AA") {
      return json as AA_Details;
    }
    if (type === "TEXT") {
      return json as Message_Details;
    }
    if (type === "FILE") {
      return json as File_Details;
    }
    return json as DETAILS;
  }

  /**
   * Cheap way to get content-dispoition header & content-type and get extension
   * @param url
   * @returns
   */
  public async peekFile(
    url: string
  ): Promise<{ fileName: string; type: string; extension: string }> {
    return peekFile(this._config.token as string, url);
  }

  public isEnvelope(candidate: any) {
    return (
      "targetUrl" in candidate &&
      "resource" in candidate &&
      "appId" in candidate
    );
  }
}

export type RootList = (
  | string[]
  | string
  | RegExp
  | RegExp[]
  | { EXACT: string }
  | { FUZZY: string }
)[];
