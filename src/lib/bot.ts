import { SpeedyCard } from "./cards";
import { BLUE, GREEN, REBECCAPURPLE, RED, YELLOW } from "./colors";
import { AbbreviatedSpeedyCard } from "./cards";

import {
  API,
  checkers,
  fillTemplate,
  CoreMakerequest,
  makeRequest as RequesterFunc,
  peekFile,
  constants,
  pickRandom,
} from "./common";
import {
  ToMessage,
  Card,
  SelfData,
  MessageReply,
  RootTrigger,
  AA_Details,
  Message_Details,
  File_Details,
} from "./payloads.types";
import { Speedybot } from "./speedybot";

export type BotConfig<T = any> = {
  env?: T;
  roomId: string;
  fallbackText?: string;
  token: string;
  locales?: {
    [localeName: string]: {
      [key: string]: any;
    };
  };
  url?: string;
  SpeedybotInst: Speedybot;
};

/**
 * Root bot object used in handlers-- enshrined with many convenience helpers & lessons learned the hard way
 *
 *
 *![cards](media://first_spin.gif)
 *
 *
 */
export class BotInst {
  public roomId = "";
  private fallbackText =
    "Sorry, it appears your client does not support rendering Adaptive Cards, see here for more info: https://developer.webex.com/docs/api/guides/cards";
  private token = "";
  public meta = {
    url: "",
  };

  /**
   *  Locales holder, passed in by Speedybot but hacky escape hatch available too
   */
  public locales = {};
  private API = API;

  constructor(
    public config: BotConfig,
    private makeRequest: CoreMakerequest = RequesterFunc
  ) {
    this.roomId = config.roomId;
    this.token = config.token;
    if (config.locales) {
      this.locales = config.locales;
    }
    if (config.url) {
      this.meta.url =
        config.url.slice(-1) === "/" ? config.url : `${config.url}/`;
    }
    if (config.fallbackText) {
      this.fallbackText = config.fallbackText;
    }
  }

  /**
   * Grab a random element from a list
   * ```ts
      const list = [1, 2, 3];
      const $bot = { pickRandom(x: any[]) {} };
      $bot.pickRandom(list); // 2
   * ```  
   */
  public pickRandom(list: any[] = []) {
    return pickRandom(list);
  }

  /**
   * Grab a random element from a list
   * ```ts
      const list = ['hi, 'hello', 'yo'];
      $bot.sendRandom(list); // 'hello'
   * ```  
   */
  public sendRandom(list: any[] = []) {
    return this.send(this.pickRandom(list));
  }

  /**
   * Fill in a template (usually used by sendTemplate)
   * ```ts
   *   const utterances = ['Howdy $[name], here's $[flavor]', '$[name], here\'s your $[flavor] ice cream']
   *   const template = { name: 'Joe', flavor: 'strawberry' }
   *   const response = $bot.fillTemplate(utterances, template) // "Joe, here's your strawberry ice cream"
   *
   *
   *   const response2 = $bot.fillTemplate('Hi there the time is $[date]', {date: new Date().toString()})
   * ```
   */
  private fillTemplate(utterances: string[], template: any) {
    return fillTemplate(utterances, template);
  }

  /**
   * Send a template
   * ```ts
   *  const utterances = ['Howdy $[name], here's $[flavor]', '$[name], here's your $[flavor] ice cream']
   *  const template = { name: 'Joe', flavor: 'strawberry' }
   *  $bot.sendRandom(utterances, template) // "Joe, here's your strawberry ice cream"
   *
   * ```
   */

  /**
   *
   * Send a url wrapped in a card
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *   const utterances = [
   *     'Howdy $[name], here is a $[flavor]',
   *     '$[name], one $[flavor] ice cream for you',
   *   ]
   *   const template = { name: 'Joe', flavor: 'strawberry' }
   *   $bot.sendTemplate(utterances, template)
   *  })
   * ```
   *
   */
  public sendTemplate(utterances: string[], template: any = {}) {
    const res = this.fillTemplate(utterances, template);
    return this.send(res);
  }

  /**
   *
   * Send a url wrapped in a card
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *     const url = 'https://codepen.io/valgaze/pen/PoEpxpb'
   *    $bot.sendURL(url, 'Check this out', '💫 See Resource')
   * })
   * ```
   *
   */
  public async sendURL(
    url: string,
    title?: string,
    buttonTitle = "Go"
  ): Promise<MessageReply> {
    const card = new SpeedyCard();
    if (title) {
      card.setTitle(title).setUrl(url, buttonTitle);
    } else {
      card.setSubtitle(url).setUrl(url, buttonTitle);
    }
    return this.send(card);
  }

  /**
   * Reach an api that returns JSON-- alias to fetch
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const adviceResponse = await $bot.api('https://api.adviceslip.com/advice')
   *    const adviceText = $bot.lookUp(adviceResponse, 'slip.advice')
   *    $bot.send(`Here' some advice: ${adviceText}`)
   * })
   * ```
   *
   */
  public async api<T = any>(
    request: string | Request,
    requestInitr?: Request | RequestInit | undefined
  ): Promise<T> {
    const res = await fetch(request, requestInitr);
    try {
      const json = await res.json();
      return json as T;
    } catch (e) {
      return {} as T;
    }
  }

  /**
   *
   * Send a 1-1/DM message to a user based on their email or personId
   *
   * You can send a string or a card
   *
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *  $bot.dm('username@domain.com', 'Here is a secret message')
   *
   *  $bot.dm('aaa-bbb-ccc-ddd-eee', $bot.card({title:'biscotti', subTitle:'Is it biscotti or biscotto?' url: 'https://youtu.be/6A8W77m-ZTw?t=114', chips:['biscotti','biscotto']}))
   *
   * })
   *
   * ```
   */
  public async dm(
    personIdOrEmail: string,
    message: string | SpeedyCard | string[],
    fallback?: string
  ): Promise<Response> {
    const payload: ToMessage = {
      text: this.fallbackText,
    };
    if (checkers.isEmail(personIdOrEmail)) {
      payload["toPersonEmail"] = personIdOrEmail;
    } else {
      payload["toPersonId"] = personIdOrEmail;
    }

    if (typeof message === "string") {
      payload["markdown"] = message;
      payload["text"] = message;
    }

    const isCard = checkers.isCard(message);

    if (isCard) {
      if (fallback) {
        payload["text"] = fallback;
      }
      const cardPayload = [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content:
            typeof message !== "string" &&
            "render" in message &&
            typeof message.render === "function"
              ? message.render()
              : message,
        },
      ];
      payload["attachments"] = cardPayload;
    }

    const res = await this.makeRequest(this.API.sendMessage, payload, {
      method: "POST",
      "content-type": "application/json",
      token: this.token,
    });
    return res;
  }

  /**
   * $bot.send, core "workhorse" utility that can send whatever you throw at it
   * roomId by default is whatever is bound to bot instance
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('token_placeholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *  // Send a simple string
   *  $bot.send('Send a string')
   *
   *  // Send a card: https://developer.webex.com/docs/api/guides/cards
   *  $bot.send($bot.card({title:'My special card', subTitle:'My great subtitle', chips:['ping','pong','hi']}))
   *
   *  // Send a traditional ToMessage
   *  const payload = {
   *    toPersonEmail: 'fake_name@org.com',
   *    markdown: 'some **great** content',
   *  }
   *  $bot.send(payload)
   *  })
   *
   * ```
   *
   */
  async send<T = MessageReply>(payload: string | ToMessage | Card): Promise<T> {
    let body: ToMessage = {};

    if (payload && typeof payload !== "string") {
      if ("toPersonId" in payload) {
        body["toPersonId"] = payload.toPersonId;
      }

      if ("toPersonEmail" in payload) {
        body["toPersonEmail"] = payload.toPersonEmail;
      }

      if ("roomId" in payload) {
        body["roomId"] = this.roomId;
      }

      if (
        payload &&
        !("roomId" in payload) &&
        !("toPersonEmail" in payload) &&
        !("toPersonId" in payload)
      ) {
        body["roomId"] = this.roomId;
      }
    }

    if (typeof payload === "string") {
      body["roomId"] = this.roomId;
      body.markdown = payload;
      body.text = payload;
    } else if (typeof payload === "object") {
      const isCard = checkers.isCard(payload);
      if (isCard) {
        // attach adaptive card
        body = {
          ...body,
          markdown: this.fallbackText,
          text: this.fallbackText,
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content:
                "render" in payload && typeof payload.render === "function"
                  ? payload.render()
                  : payload,
            },
          ],
        };
      } else {
        body = {
          ...body,
          ...payload,
        };
      }
    }
    const res = await this.makeRequest(this.API.sendMessage, body, {
      method: "POST",
      "content-type": "application/json",
      token: this.token,
    });
    const json = await res.json();
    return json as T;
  }

  /**
   *
   * Convenience helper that creates a SpeedyCard
   *
   * ![cards](media://demo_sendcard.gif)
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *   const cardData = $bot.card({
   *     title: "Speedybot Hub",
   *     subTitle: "Sign the paperwork",
   *     chips: ["ping", "pong", "hi",],
   *     image: "https://github.com/valgaze/speedybot-mini/raw/deploy/docs/assets/logo.png?raw=true",
   *     url: "https://github.com/valgaze/speedybot-mini"
   *   });
   *   $bot.send(cardData);
   *  })
   *
   * ```
   */
  card(
    config: Partial<AbbreviatedSpeedyCard & { label: string }> = {}
  ): SpeedyCard {
    const card = new SpeedyCard();
    const {
      title = "",
      subTitle = "",
      image = "",
      url = "",
      urlLabel = "",
      data = {},
      chips = [],
      table = [],
      choices = [],
      backgroundImage = "",
    } = config;

    if (backgroundImage) {
      card.setBackgroundImage;
    }
    if (title) {
      card.setTitle(title);
    }

    if (subTitle) {
      card.setSubtitle(subTitle);
    }

    if (image) {
      card.setImage(image);
    }

    if (url) {
      card.setUrl(url);
    }

    if (urlLabel) {
      card.setUrlLabel(urlLabel);
    }

    if (Object.keys(data).length) {
      card.setData(data);
    }

    if (chips.length) {
      card.setChips(chips);
    }

    if (choices.length) {
      card.setChoices(choices);
    }

    if (table) {
      if (Array.isArray(table) && table.length) {
        card.setTable(table);
      } else {
        if (Object.entries(table).length) {
          card.setTable(table);
        }
      }
    }
    return card;
  }

  /**
   *
   * Get bot's meta data
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const botData = await $bot.getSelf()
   *    $bot.send(`Hi I'm a bot & my name is ${botData.displayName}`)
   *  })
   * ```
   */
  public async getSelf(): Promise<SelfData> {
    const url = this.API.getSelf;
    const res = (await this.makeRequest(
      url,
      {},
      {
        token: this.token,
        method: "GET",
      }
    )) as Response;
    const json = (await res.json()) as SelfData;
    return json;
  }

  /**
   *
   * Delete a message (need a valid messageId)
   *
   *
   * ```ts
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
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *   const msg = await $bot.send('My message to be deleted')
   *   $bot.deleteMessage(msg.id)
   * })
   * ```
   */
  public async deleteMessage(messageId: string) {
    const url = `${this.API.deleteMessage}/${messageId}`;
    const res = await this.makeRequest(
      url,
      {},
      {
        token: this.token,
        method: "DELETE",
      }
    );
    return res;
  }

  /**
   * Temporary card that you can stash away data and destroy
   *
   *
   * ```ts
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
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *   const msg = 'mysecret'
   *   $bot.stashCard('mySecret')
   * })
   *
   * ```
   */
  public stashCard(secret: string, message?: string) {
    return this.card({ title: message || "Info" })
      .setDetail({
        subTitle: secret,
      })
      .setData({ [constants.actionKeyword]: "delete" })
      .setButtonLabel("🔥 Burn Data");
  }

  /**
   * Cheap way to get content-dispoition header & content-type and get extension
   * @param url
   * @returns
   */
  public async peekFile(
    url: string
  ): Promise<{ fileName: string; type: string; extension: string }> {
    return peekFile(this.token, url);
  }
  /**
   * Get a (secured) file's contents, probably would use this for examining uploaded files
   * like JSON, excel (xlsx), etc
   *
   * @param url
   *
   * @param opts
   * @returns
   *
   * ```ts
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
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *   const [fileUrl] = trigger.message.files || []
   *   const fileData = await $bot.getFile(fileUrl, {
   *     responseType: 'arraybuffer',
   *   })
   *   const { fileName, extension, type } = fileData
   *   $bot.say(
   *     `The file you uploaded (${fileName}), is a ${extension} file of type ${type}`
   *   )
   *    // with fileData.data you have access to an arrayBuffer with the raw bytes of that file
   * })
   *
   * ```
   * */
  public async getFile(
    url: string,
    opts: {
      responseType?: "arraybuffer" | "json";
    } = {}
  ): Promise<{
    fileName: string;
    extension: string;
    type: string;
    data: ArrayBuffer | any;
    markdownSnippet: string;
  }> {
    const res = await this.makeRequest(
      url,
      {},
      {
        method: "GET",
        token: this.token,
      }
    );
    const type = res.headers.get("content-type") as string;
    const contentDispo = res.headers.get("content-disposition") as string;
    const fileName = contentDispo
      .split(";")[1]
      .split("=")[1]
      .replace(/\"/g, "");
    const extension = fileName.split(".").pop() || "";
    // data could be binary if user needs it
    const shouldProbablyBeArrayBuffer =
      (!type.includes("json") && !type.includes("text")) ||
      type.includes("image");
    let data: ArrayBuffer | Response | {} = res;
    if (opts.responseType === "arraybuffer" || shouldProbablyBeArrayBuffer) {
      try {
        data = await res.arrayBuffer();
      } catch (e) {
        // failed, fallback
        data = {};
      }
    } else {
      try {
        if (type.includes("json")) {
          data = await res.json();
        } else {
          // should we not presume text?
          data = await res.text();
        }
      } catch (e) {
        data = {};
      }
    }

    let markdownSnippet = `***No markdown preview available for ${type}***`;
    const payload = {
      fileName,
      extension,
      type,
      data,
      markdownSnippet:
        type === "application/json" ||
        (typeof data === "string" && data.length < 900)
          ? this.snippet(data)
          : markdownSnippet,
    };
    return payload;
  }

  private generateFileName() {
    return `${this.rando()}_${this.rando()}`;
  }

  /**
   * Generate a random string of 11 characters (letters + numbers)
   */
  public rando(): string {
    return Math.random().toString(36).slice(2);
  }

  private handleExtension(input = "") {
    const hasDot = input.indexOf(".") > -1;
    let fileName = "";
    const [prefix, ext] = input.split(".");
    if (hasDot) {
      if (!prefix || prefix === "*") {
        // '.json' case, generate prefix
        fileName = `${this.generateFileName()}.${ext}`;
      } else {
        // 'a.json' case, pass through
        fileName = input;
      }
    } else {
      // 'json' case, generate prefix, add .
      fileName = `${this.generateFileName()}.${prefix}`;
    }
    return fileName;
  }

  /**
   *
   *
   * Generate a file and fill it with the data you provide and send to user to download
   *
   * At minimum, provide the file data & desired file extension
   *
   * ```ts
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
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const myData = { a: 1, b: 2, c: [1,2,3,'hello', 'bonjour']}
   *    $bot.sendDataAsFile(myData, 'json')
   *    // with fileData.data you have access to an arrayBuffer with the raw bytes of that file
   * })
   *
   * ```
   */
  public async sendDataAsFile(
    data: any,
    extensionOrFileName: string,
    contentType = null,
    textLabel?: string,
    overrides: {
      toPersonId?: string;
      toPersonEmail?: string;
      roomId?: string;
    } = {}
  ) {
    if (!extensionOrFileName) {
      throw new Error(
        `$(bot).sendDataAsFile: Missing filename/extension parameter, ex "myfile.png" or "*.png"`
      );
    }
    let finalContentType: string | null = contentType;
    if (!finalContentType) {
      finalContentType = this.guessContentType(extensionOrFileName);
      if (!finalContentType) {
        throw new Error(
          `$(bot).sendDataAsFile: Missing 'content-type' parameter, ex "image/png"`
        );
      }
    }
    const fullFileName = this.handleExtension(extensionOrFileName);
    const formData = new FormData();
    const {
      toPersonId = null,
      toPersonEmail = null,
      roomId = null,
    } = overrides;
    const label = toPersonId
      ? "toPersonId"
      : toPersonEmail
      ? "toPersonEmail"
      : "roomId";
    const destinationValue = toPersonId
      ? toPersonId
      : toPersonEmail
      ? toPersonEmail
      : roomId || this.roomId;

    const isJSON =
      data && typeof data === "object" && finalContentType.includes("json");
    formData.append(
      "files",
      new Blob([isJSON ? JSON.stringify(data, null, 2) : data], {
        type: finalContentType,
      }),
      fullFileName
    );
    // formData.append('roomId', this.roomId) // handled w/ label/desintation
    formData.append(label, destinationValue);
    formData.append("text", textLabel || " ");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    };
    const res = await fetch(API.sendMessage, requestOptions);
    return res;
  }

  private guessContentType(extensionOrFileName: string) {
    // Most users probably  won't know/care about content-types, attempt to guess it from
    // file-extension if explicit content-type isn't
    const hasDot = extensionOrFileName.indexOf(".") > -1;
    let extension = "";
    const pieces = extensionOrFileName.split(".");
    const hasMultipleDots = pieces.length > 2; // Little trick: if only one dot, there should only be 2 elements
    const [prefix, ext] = pieces;
    if (hasDot) {
      // ".png"
      // "a.png"
      // "*.png"
      if (!prefix || prefix === "*") {
        extension = ext;
      }
      // a.b.c.png
      if (hasMultipleDots) {
        // last piece will be extension
        extension = pieces.pop() as string;
      }
    } else {
      // "png"
      extension = prefix;
    }

    // ~<3 17 May 20222 @ 7:30am: This nightmare chart was filled-in by GPT3 & saved a bunch of time
    // At minimum, support these file types (per https://developer.webex.com/docs/basics)
    // ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'gif', 'png']
    // But also definitely also want: html, txt, csv,
    const mapping: { [key: string]: string } = {
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      bmp: "image/bmp",
      gif: "image/gif",
      png: "image/png",
      txt: "text/plain",
      csv: "text/csv",
      html: "text/html",
      json: "application/json",
      "*": "application/octet-stream", // #gbogh
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      mpeg: "video/mpeg",
      mpkg: "application/vnd.apple.installer+xml",
      vf: "application/json", // voiceflow
    };
    const res = mapping[extension] || null;
    return res;
  }

  /**
   *
   * Trigger handler matching as if entered by the user
   *
   * This will not trigger .every or .noMatch handlers
   *
   * **Note:** The ```msg``` parameter of matched handler function will refer to the original message
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
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
  public async trigger(
    text: string,
    msg:
      | (RootTrigger<Message_Details> & { text: string })
      | (RootTrigger<File_Details> & { text?: string })
      | RootTrigger<AA_Details>
  ) {
    // We need a clever way to wire in host speedybot dab-nabbit
    const speedyRef = this.config.SpeedybotInst;

    const handlerRef = speedyRef.processText(text, true);
    const decoratedMessage = Object.assign(msg, { text });
    if (handlerRef) {
      return await handlerRef(this, decoratedMessage);
    }
    return 0;
  }

  /**
   * Send a message with a reply
   *
   * @param thread
   * ex
   * $bot.thread([$bot.card().setTitle('hello world!').setChips(['a','b','c']), 'Pick one of the above!'])
   *
   */

  /**
   *
   * Send a message and attach replies
   *
   * Current Limitations :(
   * - Only 1st message can be a card
   * - Replies can only be strings
   * - With more than 2-3 replies, order is not guaranteed (replies can arrive out of order)
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *   $bot.thread([$bot.card().setTitle('hello world!').setChips(['a','b','c']), 'Pick one of the above!', 'Come on do it!'])
   * })
   *
   * ```
   */
  public async thread(
    thread: [string | SpeedyCard, ...Array<string | ToMessage>]
  ) {
    let [root, ...messages] = thread;

    const { id: parentId } = await this.send(root);
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      let msgObj: ToMessage = {
        parentId,
      };
      if (typeof msg === "string") {
        msgObj["markdown"] = msg;
        msgObj["text"] = msg;
      }
      if (typeof msg === "object") {
        msgObj = {
          ...msgObj,
          ...(msg as object),
        };
      }
      this.send(msgObj);
    }
  }

  /**
   * Translate a string based on provided locale config
   *
   * ```ts
   * // locale data (gets specified into Speedybot config)
   * const locales = {
   *  en: {
   *    greetings: {
   *      welcome: 'Hello!!'
   *    }
   *  },
   *  es: {
   *    greetings: {
   *      welcome: 'hola!!'
   *    }
   *  },
   *  cn: {
   *    greetings: {
   *      welcome: '你好'
   *    }
   *  }
   * }
   *
   * const config = {
   *  token: 'abc',
   *  locales
   * }
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot(config);
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const eng = $bot.translate('en', 'greetings.welcome') // 'Hello!!'
   *    const esp = $bot.translate('es', 'greetings.welcome') // 'hola!!'
   *    const chn = $bot.translate('cn', 'greetings.welcome') // '你好'
   *    const fallback = $bot.translate('whoops_doesnt_exist', 'greetings.welcome', 'Hey there fallback!')
   *    $bot.send(`${eng}, ${esp}, ${chn}, ${fallback}`)
   * })
   *
   *
   * ```
   *
   */
  public translate(
    locale: string,
    lookup: string,
    template = {},
    fallback = ""
  ) {
    const selectedLocale = this.locales[locale] || {};
    const content = this.lookUp(selectedLocale, lookup, fallback);
    if (Object.keys(template)) {
      return this.fillTemplate(content, template);
    } else {
      return content;
    }
  }

  /**
   * Provide a URL but it gets returned as a file
   *
   * Filetypes: 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'gif', 'png'
   * See more info here: https://developer.webex.com/docs/basics
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const pdfURL = 'https://speedybot.valgaze.com'
   *    $bot.sendDataFromUrl(pdfURL, "Here's a doc!")
   *  })
   * ```
   *
   */
  public sendDataFromUrl(url: string, fallbackText = " ") {
    return this.send({
      files: [url],
      text: fallbackText,
    });
  }

  /**
   * Logs to system
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    $bot.log('Testing 123')
   *    $bot.log(`Input text: ${msg.text}`)
   *  })
   * ```
   *
   */
  public log(...payload: any): void {
    console.log.apply(console, payload as [any?, ...any[]]);
  }

  /**
   * Takes input data and wraps in markdown backticks
   * @param data
   * @param dataType
   * @returns
   */
  public snippet(data: any, dataType = "json") {
    const msg = `
\`\`\`${dataType}
${dataType === "json" ? JSON.stringify(data, null, 2) : data}
\`\`\``;
    return msg;
  }
  /**
   * Clear the screen on desktop clients (useful for demos)
   *
   * ```ts
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *   $bot.send('This will more or less disappear...')
   *   $bot.clearScreen()
   *  })
   * ```
   *
   */
  public async clearScreen(repeatCount = 50) {
    const newLine = "\n";
    const repeatClamp = repeatCount > 7000 ? 5000 : repeatCount; // 7439 char limit
    const clearScreen = `${newLine.repeat(repeatClamp)}`;
    const payload = {
      markdown: clearScreen,
      text: clearScreen,
    };
    return this.send(payload);
  }

  /**
   * Display a snippet of nicely-formatted (alias for $bot.sendSnippet)
   * JSON data or code-snippet to the user
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const specialData = {a:1, b:2, c: [1,2,3]}
   *    $bot.sendJSON(specialData)
   *  })
   * ```
   *
   *
   */
  public sendJSON<T = any>(data: T, label?: string) {
    return this.sendSnippet(data as unknown as object, label, "json");
  }

  /**
   * Display a snippet to the user
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const specialData = {a:1, b:2, c: [1,2,3]}
   *    $bot.sendSnippet(specialData)
   *  })
   * ```
   *
   */
  async sendSnippet(
    data: string | object,
    label = "",
    dataType = "json",
    fallbackText?: string
  ): Promise<void> {
    let markdown;
    if (dataType === "json") {
      markdown = this.snippet(data);
    } else {
      markdown = this.snippet(data, "html");
    }
    if (label) {
      markdown = label + " \n " + markdown;
    }
    return this.send({
      roomId: this.roomId,
      markdown,
      text: fallbackText ? fallbackText : this.fallbackText,
    });
  }

  /**
   * Traverse a property lookup path on a object
   * fallback to a value (if provided) whenever
   * path is invalid
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const myData = {a:1,b:2,c:{d:3}}
   *    const succeed = $bot.lookUp(myData, 'a.b.c.d', 'fallback') // 3
   *    const fail = $bot.lookUp(myData, 'a.b.ce.e.f.g', 'fallback') // 'fallback'
   *    $bot.send(`succeed: ${succeed}, fail: ${fail}`)
   *  })
   * ```
   *
   *
   */
  public lookUp(locale: any, lookup = "", fallback?: string) {
    let res = locale;
    lookup.split(".").forEach((k) => {
      if (res) {
        res = res[k];
      } else {
        res = fallback;
      }
    });
    return res ? res : fallback;
  }

  // Color cards-- can be served from URL or base64 encoded

  /**
   * Returns an instance of a dangerCard. dangerCards have blue skylike background:
   *
   *
   * ![cards](media://colored_cards.gif)
   *
   *
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const danger = $bot.dangerCard({
   *     title: '⛔️DANGER-- do not do that!⛔️',
   *     subTitle: 'There is a very important reason not to do that',
   *     chips: ['ping', 'pong'],
   *    })
   *     $bot.send(danger)
   *  })
   * ```
   *
   * @param payload (title, subtitle, etc)
   * @returns SpeedyCard
   */
  public dangerCard(payload: Partial<AbbreviatedSpeedyCard> = {}) {
    return this.card(payload).setBackgroundImage(
      `data:image/png;base64,${RED}`
    );
  }

  /**
   * Returns an instance of a debugCard
   *
   *
   * ![cards](media://colored_cards.gif)
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const debug = $bot.debugCard({
   *     title: 'Testing 321',
   *     subTitle: 'Testing 456',
   *     chips: ['ping', 'pong'],
   *     })
   *     $bot.send(debug)
   *  })
   * ```
   *
   *
   * @param payload (title, subtitle, etc)
   * @returns SpeedyCard
   */
  public debugCard(payload: Partial<AbbreviatedSpeedyCard> = {}) {
    return this.card(payload).setBackgroundImage(
      `data:image/png;base64,${REBECCAPURPLE}`
    );
  }

  /**
   * Returns an instance of a SuccessCard. SuccessCards have blue skylike background:
   *
   *
   * ![cards](media://colored_cards.gif)
   *
   *
   * ```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const warning = $bot.successCard({
   *     title: '⚠️Warning-- you should consider carefully if you want to do that!⚠️',
   *     subTitle: 'There is a very important reason to slow down and consider if you want to do that...or not',
   *     chips: ['ping', 'pong'],
   *    })
   *     $bot.send(warning)
   *  })
   * ```
   *
   * @param payload (title, subtitle, etc)
   * @returns SpeedyCard
   */
  public warningCard(payload: Partial<AbbreviatedSpeedyCard> = {}) {
    return this.card(payload).setBackgroundImage(
      `data:image/png;base64,${YELLOW}`
    );
  }

  /**
   * Returns an instance of a SuccessCard. SuccessCards have blue skylike background:
   *
   *
   * ![cards](media://colored_cards.gif)
   *
   *
   *
   *```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const success = $bot.successCard({
   *     title: '🌟You did it!🎉',
   *     subTitle: 'Whatever you did, good at job at doing it',
   *     chips: ['ping', 'pong'],
   *    })
   *     $bot.send(success)
   *  })
   * ```
   *
   * @param payload (title, subtitle, etc)
   * @returns SpeedyCard
   */
  public successCard(payload: Partial<AbbreviatedSpeedyCard> = {}) {
    return this.card(payload).setBackgroundImage(
      `data:image/png;base64,${GREEN}`
    );
  }

  /**
   * Returns an instance of a skyCard. SkyCards have blue skylike background:
   *
   *
   * ![cards](media://colored_cards.gif)
   *
   *```ts
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('tokenPlaceholder');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"],
   *  async ($bot, msg) => {
   *    const card = $bot.skyCard({title: '☁️ What a pleasant card ☁️'})
   *    $bot.send(card)
   *  })
   * ```
   *
   * @param payload (title, subtitle, etc)
   * @returns SpeedyCard
   */
  public skyCard(payload: Partial<AbbreviatedSpeedyCard> = {}) {
    return this.card(payload).setBackgroundImage(
      `data:image/gif;base64,${BLUE}`
    );
  }

  /**
   * Generate a markdown link to a resource
   * @param target
   * @param label
   * @param noBold
   * @returns markdown click'able link
   */

  /**
   *
   * Creates a markdown bolded hyperlink
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  const link = $bot.buildLink('https://youtu.be/6A8W77m-ZTw?t=114')
   *  $bot.send('Is it biscotti or biscotto?')
   * })
   *
   * ```
   *
   */
  public buildLink(target: string, label?: string, noBold = false): string {
    // '[🍦 Talk to "Treatbot" & order iecream](webexteams://im?email=treatbot@webex.bot)'
    let link = `[${label || target}](${target})`;
    if (!noBold) {
      link = `**${link}**`;
    }
    return link;
  }

  /**
   *
   * Build a markdown, click'able link to a meeting with a specific person)
   * @param target (email address)
   * @param label
   * @param noBold
   * @returns
   */

  /**
   *
   * Generate a meeting hyperlink to open a meeting with a person
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  const email = 'joe@joe.com'
   *  const label = 'Click here to talk to Joe'
   *  const link = $bot.buildMeetingLink(email, label)
   *  $bot.send(link)
   * })
   *
   * ```
   *
   */
  public buildMeetingLink(
    target: string,
    label?: string,
    noBold = false
  ): string {
    return this.buildLink(`webexteams://meet?sip=${target}`, label, noBold);
  }
  /**
   *
   * Generate a hyperlink to send a message to a person/agent
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  const email = 'joe@joe.com'
   *  const label = 'Send a message to Joe'
   *  const link = $bot.buildImLink(email, label)
   *  $bot.send(link)
   * })
   *
   * ```
   *
   */
  public buildImLink(target: string, label?: string, noBold = false): string {
    // **[aa](http://www.google.com)**
    // **[🤖 Talk to Speedybot & say "hi"](webexteams://im?email=speedybot@webex.bot)**
    return this.buildLink(`webexteams://im?email=${target}`, label, noBold);
  }

  /**
   *
   * Build a markdown, click'able link to a specific space (OPT+CMD+K on Mac or CTRL-SHFT-K on windows to get space id)
   * @param target (email)
   * @param label
   * @param noBold
   * @returns
   */

  /**
   *
   * Generate a hyperlink to a space/room
   *
   * ## Example
   *
   * ```ts
   *
   * import { Speedybot } from 'speedybot-mini'
   * // 1) Initialize your bot w/ config
   * const CultureBot = new Speedybot('__REPLACE__ME__');
   *
   * // 2) Export your bot
   * export default CultureBot;
   *
   * // 3) Do whatever you want!
   *
   * CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
   *  const roomId = 'Y2lzY29zL3ajsLpmVzL1JPT00vNTBjNma'
   *  const label = 'Go to the special space'
   *  const link = $bot.buildSpaceLink(roomId, label)
   *  $bot.send(link)
   * })
   *
   * ```
   *
   */
  public buildSpaceLink(
    target: string,
    label?: string,
    noBold = false
  ): string {
    // **[🗣 Get help](webexteams://im?space=6d124c80-f638-11ec-bc55-314549e772a9)**
    return this.buildLink(`webexteams://im?space=${target}`, label, noBold);
  }

  //Aliases
  /**
   * Legacy alias for $bot.send
   *
   *
   */
  public async say<T = any>(
    payload:
      | string
      | ToMessage
      | Card
      | { roomId: string; [key: string]: string | number | any }
  ): Promise<T> {
    return this.send(payload);
  }

  /**
   * Legacy alias for $bot.sendCard
   *
   *
   */
  public async sendCard<T = any>(payload: Card): Promise<T> {
    return this.send(payload);
  }
}

export function InitBot(
  config: BotConfig,
  makeRequest: CoreMakerequest = RequesterFunc
) {
  return new BotInst(config);
}

/**
 *
 * Bot instance to handle incoming webhooks. The basic idea is receive an incoming webhook, process/enrich the content, then if necessary dispatch alert to a person or "room" (set of persons)
 *
 * ex.
 * ```ts
 *
 *   import {WebhookBot} from './src/lib/speedybot'
 *
 *    const hooks: Hooks = {
 *     '/jira_incoming': {
 *       async handler(request, env, ctx) {
 *         const BotConfig: Partial<BotConfig> = {
 *           token: config.token,
 *           url: request.url,
 *         }
 *         const $bot = WebhookBot(BotConfig)
 *         // send a message to a room
 *         $bot.sendRoom('__PUT_ROOM_ID_HERE', 'Some great message or card')
 *
 *         //Send a card
 *         $bot.sendRoom('__PUT_ROOM_ID_HERE',$bot.card({title: 'hi there', subtitle: 'here is a subittle', chips: ['a','b','c']}))
 *
 *         const data = await request.data()
 *         $bot.DM('username@email.com', `This was just posted to /incoming_route: ${JSON.stringify(data, null, 2)}`)
 *       },
 *     }
 *    }
 * }
 *
 * ```
 */
export function WebhookBot(
  config: Partial<BotConfig>,
  makeRequest: CoreMakerequest = RequesterFunc
) {
  const inst = new BotInst(config as BotConfig); // skip roomId & Speedybot inst & friends
  // Restrict to smaller subset
  return {
    snippet(data: any, dataType: string) {
      return inst.snippet(data, dataType);
    },
    async sendRoom(roomId: string, message: string | SpeedyCard | string[]) {
      inst.roomId = roomId;
      if (Array.isArray(message)) {
        for (const msg in message) {
          await inst.send(msg);
        }
      } else {
        inst.send(message);
      }
    },
    sendRoomDataAsFile(
      roomId: string,
      data: any,
      extensionOrFileName: string,
      contentType = null,
      textLabel?: string,
      overrides: {
        toPersonId?: string;
        toPersonEmail?: string;
      } = {}
    ) {
      let payload = { roomId };
      return inst.sendDataAsFile(
        data,
        extensionOrFileName,
        null,
        undefined,
        payload
      );
    },
    dmDataAsFile(
      personIdOrEmail: string,
      data: any,
      extensionOrFileName: string,
      contentType = null,
      textLabel?: string,
      overrides: {
        toPersonId?: string;
        toPersonEmail?: string;
      } = {}
    ) {
      let payload = {};
      const isEmail = checkers.isEmail(personIdOrEmail);
      if (isEmail) {
        payload = { toPersonEmail: personIdOrEmail };
      } else {
        payload = { toPersonId: personIdOrEmail };
      }
      return inst.sendDataAsFile(
        data,
        extensionOrFileName,
        null,
        undefined,
        payload
      );
    },
    dm(
      personIdOrEmail: string,
      message: string | SpeedyCard | string[],
      fallback?: string | undefined
    ): Promise<Response> {
      return inst.dm(personIdOrEmail, message);
    },
    card(config?: Partial<AbbreviatedSpeedyCard>) {
      return inst.card(config);
    },
  };
}
