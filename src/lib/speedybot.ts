/**
 *
 * 1. speedybot 2.0: feature-parity, etc, speedybot-voiceflow to 2.0
 * 2. speedybot-workers (fork to work w/ cloudflare workers/v8 isolates, location experimental)
 * 3. speedybot-lambda << Repo
 * 4. Visual web ui to guide you through boom.
 *
 */
// Rule: we lowercase input message for contains
// .contains(), if lower-cased input contains target
// .nlu to send to voiceflow integrated
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

export type HandlerFunc<T = any> = (
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

export class Speedybot {
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
    config: Config | string,
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
    camera: null | HandlerFunc;
    file: null | HandlerFunc;
    submit: null | HandlerFunc;
    NO_MATCH: null | HandlerFunc;
    ALL: null | HandlerFunc;

    [key: string]: HandlerFunc | null;
  } = {
    camera: null,
    file: null,
    submit: null,
    NO_MATCH: null,
    ALL: null,
  };

  private checkStrings(a: string, incoming: string, exact = false) {
    if (exact) return a === incoming;
    const [first] = incoming.toLowerCase().split(" ");
    return first === a.toLocaleLowerCase();

    // return incoming.toLowerCase().includes(a.toLowerCase());
  }

  /**
   * Register a handler that matches on a string or list of strings
   * @param keyword
   *
   * @param cb
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

  public exact(keyword: string, cb: MsgHandler) {
    // Aliases to regex
    this.handlers[this.rootList.length] = cb;
    this.rootList.push({ EXACT: keyword });
  }

  public regex(rx: RegExp, cb: MsgHandler) {
    this.handlers[this.rootList.length] = cb;
    this.rootList.push(rx);
  }

  noMatch(handler: MsgHandler) {
    this.handlers["NO_MATCH"] = handler;
  }

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
    //@ts-ignore
    this._config.features[route] = data;
  }

  /**
   * Camera handler-- will trigger by default for png, jpeg, & jpg
   * @param handler
   *
   * ### Example
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

  setHandler(handlerType: string, handler) {
    this.handlers[handlerType] = handler;
  }
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

  onSubmit(handler: AAHandler) {
    this.setHandler("submit", handler);
    const ref = this;
    return {
      config(fileConfig: FileConfig) {
        ref.setConfig("files", fileConfig);
      },
    };
  }

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

  async processIncoming(envelope: ENVELOPES): Promise<void> {
    const type = this.detectType(envelope);
    const { personId, roomId } = envelope.data;
    const isHuman = await this.isHuman(personId);

    if (!isHuman) return; // <-- hmmm, later we should think about bots talking to other bots
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
                camHandler(botInst, botTrigger, res);
              }
            } else {
              const handler: FileHandlerFunc = this.handlers
                .file as FileHandlerFunc;
              const exclusionList =
                this._config.features?.files.excludeFiles || [];
              if (handler && !exclusionList.includes(extension)) {
                handler(botInst, botTrigger, res);
              }
            }
          } else if (this.handlers.file) {
            const handler: FileHandlerFunc = this.handlers
              .file as FileHandlerFunc;
            const exclusionList =
              this._config.features?.files.excludeFiles || [];
            if (handler && !exclusionList.includes(extension)) {
              handler(botInst, botTrigger, res);
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
          handler(botInst, { ...botTrigger, text });
        }

        // Run catchall handler
        const catchall = this.handlers.ALL;
        if (
          catchall &&
          !this._config.features?.catchAll.skipList.includes(text)
        ) {
          catchall(new BotInst(bot_config), { ...botTrigger, text });
        }
      }
    }

    if (type === "AA") {
      const handler = this.processSubmit(details as AA_Details);
      if (handler) {
        const botInst = new BotInst(bot_config, this.makeRequest);
        handler(botInst, {
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
            catchall(new BotInst(bot_config), { ...botTrigger, text });
          }
        }
      }
    }
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
  processText(incoming: string = "") {
    let target = -1;
    this.rootList.forEach((item, idx) => {
      let match = false;
      if (typeof item === "string") {
        match = this.checkStrings(item, incoming);
      }
      if (typeof item === "object" && "EXACT" in item) {
        const { EXACT } = item;
        match = this.checkStrings(EXACT, incoming, true);
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
            }
            if (match) {
              target = idx;
            }
          }
        });
      }
    });

    // if catchall (useful for NLU) runs

    if (target >= 0) {
      return this.handlers[target] &&
        typeof this.handlers[target] === "function"
        ? this.handlers[target]
        : null;
    } else if (this.handlers["NO_MATCH"]) {
      return typeof this.handlers["NO_MATCH"] === "function"
        ? this.handlers["NO_MATCH"]
        : null;
    }
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
    return msgId;
  }

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
)[];
