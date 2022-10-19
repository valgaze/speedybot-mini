import { checkers, constants } from "./common";
export type AbbreviatedSpeedyCard = {
  title: string;
  subTitle: string;
  image: string;
  url: string;
  urlLabel: string;
  data: AttachmentData;
  chips: (string | { label: string; keyword?: string })[];
  table: string[][] | { [key: string]: string };
  choices: (string | number)[];
  backgroundImage: string;
};

export interface BaseConfig {
  title?: string;
  titleConfig?: Partial<TextBlock>;
  choices?: string[];
  buttons?: string[];
}

export interface BaseOpts {
  horizontalAlignment?: "Left" | "Center" | "Right";
  size?: "Small" | "Default" | "Medium" | "Large" | "ExtraLarge";
}

export interface ChoiceOption {
  title: string;
  value: string;
}

export interface ChoiceBlock {
  type?: string; // "Input.ChoiceSet"
  id?: string;
  value?: string;
  isMultiSelect?: boolean;
  isVisible?: boolean;
  choices?: ChoiceOption[];
}

export interface TextBlock extends BaseOpts {
  type: "TextBlock";
  text: string;
  color?:
    | "Default"
    | "Dark"
    | "Light"
    | "Accent"
    | "Good"
    | "Warning"
    | "Attention";
  fontType?: string;
  isSubtle?: boolean;
  weight: "Lighter" | "Default" | "Bolder";
  wrap?: boolean;
}

export interface ImageBlock extends BaseOpts {
  type: "Image";
  url: string;
}

export interface LinkButton {
  type: "Action.OpenUrl";
  title: string;
  url: string;
  style?: "positive" | "destructive";
}

export interface inputConfig {
  id?: string;
  placeholder?: string;
  isMultiline?: boolean;
}

export interface Fact {
  title: string;
  value: string;
}
export interface FactSet {
  type: "FactSet";
  facts: Fact[];
}
export interface AttachmentData {
  [key: string]: any;
}

/**
 * SpeedyCard
 *  Work in progress
 * - zero-knowledge, easy declarative way to construct
 * "rich" (ie interactive adpative cards)
 * 
 * - Chain methods together, kinda like SwiftUI's syntax: https://developer.apple.com/xcode/swiftui/
 * 
 * ```ts 
   import { SpeedyCard } from 'speedybot'

   const cardPayload = new SpeedyCard().setTitle('System is 👍')
    .setSubtitle('If you see this card, everything is working')
    .setImage('https://i.imgur.com/SW78JRd.jpg')
    .setInput(`What's on your mind?`)
    .setUrl(pickRandom(['https://www.youtube.com/watch?v=3GwjfUFyY6M', 'https://www.youtube.com/watch?v=d-diB65scQU']), 'Take a moment to celebrate')
    .setTable([[`Bot's Date`, new Date().toDateString()], ["Bot's Uptime", `${String(process.uptime()).substring(0, 25)}s`]])

    bot.sendCard(cardPayload.render(), 'Your client doesnt appear to support adaptive cards')
 * ```
 */
export interface SelectorPayload {
  id: string;
  type: string;
  label?: string;
}
export class SpeedyCard {
  public title = "";
  public subtitle = "";
  public titleConfig: Partial<TextBlock> = {};
  public subTitleConfig: Partial<TextBlock> = {};
  public choices: ChoiceOption[] = [];
  public choiceConfig: Partial<ChoiceBlock> = {};
  public image: string = "";
  public imageConfig: BaseOpts = {};
  public buttonLabel = "Submit";
  public inputPlaceholder = "";
  public inputConfig: inputConfig = {
    id: "inputData",
  };
  public url = "";
  public urlLabel = "Go";
  public tableData: string[][] = [];
  public attachedData: AttachmentData = {};
  public needsSubmit = false;
  public dateData: Partial<SelectorPayload> = {};
  public timeData: Partial<SelectorPayload> = {};
  public backgroundImage = "";
  public texts: {
    type?: string; // TextBlock
    text?: string;
    horizontalAlignment?: string; // Left | Center | Right
    size?: string;
  }[] = [];
  public details: {
    type: string;
    title: string;
    card: any;
  }[] = [];

  // Super loose typing for now
  public json: EasyCardSpec = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.0",
    body: [],
  };

  constructor() {}

  setText(text: string | string[]) {
    if (Array.isArray(text)) {
      text.forEach((t) => this.setText(t));
    } else {
      const payload = {
        type: "TextBlock",
        text: text,
        horizontalAlignment: "Left",
        size: "Medium",
        wrap: true,
      };
      this.texts.push(payload);
    }

    return this;
  }

  setBackgroundImage(url: string) {
    this.backgroundImage = url;
    return this;
  }
  setTitle(title: string, config?: Partial<TextBlock>) {
    this.title = title;
    if (config) {
      this.titleConfig = config;
    }
    return this;
  }

  setSubtitle(subtitle: string, config?: Partial<TextBlock>) {
    this.subtitle = subtitle;
    if (config) {
      this.subTitleConfig = config;
    }
    return this;
  }

  setChoices(choices: (string | number)[], config?: ChoiceBlock) {
    this.choices = choices.map((choice: string | number, idx) => {
      return {
        title: String(choice),
        value: String(choice),
      };
    });
    if (config) {
      this.choiceConfig = config;
    }
    return this;
  }

  setImage(url: string, imageConfig?: any) {
    this.image = url;
    if (imageConfig) {
      this.imageConfig = imageConfig;
    }
    return this;
  }

  setButtonLabel(label: string) {
    this.buttonLabel = label;
    return this;
  }

  setInput(placeholder: string, config?: inputConfig) {
    this.inputPlaceholder = placeholder;
    if (config) {
      this.inputConfig = config;
    }
    return this;
  }

  setUrl(url: string, label = "Go") {
    this.urlLabel = label;
    this.url = url;
    return this;
  }

  setUrlLabel(label: string) {
    this.urlLabel = label;
    return this;
  }

  setTable(input: (string | number)[][] | { [key: string]: string }) {
    let core = input;
    if (!Array.isArray(input) && typeof input === "object") {
      core = Object.entries(input);
    }
    this.tableData = core as string[][];
    return this;
  }

  setData(payload: AttachmentData) {
    if (payload) {
      this.attachedData = payload;
      this.needsSubmit = true;
    }
    return this;
  }

  setDate(id = "selectedDate", label = "") {
    const payload = {
      type: "Input.Date",
      id,
      label,
    };
    this.dateData = payload;
    return this;
  }

  setTime(id = "selectedTime", label: string = "Select a time") {
    const payload = {
      type: "Input.Time",
      id,
      label,
    };
    this.timeData = payload;
    return this;
  }

  /**
   *
   * Add a card into a card
   *
   * Kinda like Action.Showcard: https://adaptivecards.io/explorer/Action.ShowCard.html
   *
   *
   * @param payload (another SpeedyCard)
   * @param label
   * @returns
   */
  setDetail(
    payload: Partial<AbbreviatedSpeedyCard & { label?: string }> | SpeedyCard,
    label?: string
  ) {
    const isCard = checkers.isCard(payload);
    let buttonLabel = label || "Details";
    if ("label" in payload) {
      buttonLabel = payload.label as string;
    }
    let card;
    if ("render" in payload) {
      card = payload.render();
    } else if (!isCard) {
      card = this.card(payload).render();
    }

    this.details.push({
      type: "Action.ShowCard",
      title: buttonLabel,
      card,
    });
    return this;
  }

  addChip(
    payload: string | { label: string; keyword?: string },
    submitLabel = "chip_action"
  ) {
    this.setChips([payload], submitLabel);
  }

  addAction(payload: string, label: string) {
    this.addChip({ keyword: payload, label }, constants.actionKeyword);
  }

  /**
   *
   * @param chips
   * @param submitLabel
   * @returns
   */
  setChips(
    chips: (string | { label: string; keyword?: string })[],
    submitLabel = "chip_action"
  ) {
    const chipPayload = chips.map((chip) => {
      let chipLabel = "";
      let chipAction = "";
      if (typeof chip === "string") {
        chipLabel = chip;
        chipAction = chip;
      } else {
        const { label, keyword = "" } = chip;
        chipLabel = label;
        if (keyword) {
          chipAction = keyword;
        } else {
          chipAction = label;
        }
      }

      const payload = {
        type: "Action.Submit",
        title: chipLabel,
        data: {
          [submitLabel]: chipAction,
        },
      };
      return payload;
    });
    this.json.actions = this.json.actions
      ? this.json.actions.concat(chipPayload)
      : chipPayload;
    return this;
  }

  render() {
    if (this.backgroundImage) {
      this.json.backgroundImage = this.backgroundImage;
    }

    if (this.title) {
      const payload: TextBlock = {
        type: "TextBlock",
        text: this.title,
        weight: "Bolder",
        size: "Large",
        wrap: true,
        ...this.titleConfig,
      };
      this.json.body.push(payload);
    }

    if (this.subtitle) {
      const payload: TextBlock = {
        type: "TextBlock",
        text: this.subtitle,
        size: "Medium",
        isSubtle: true,
        wrap: true,
        weight: "Lighter",
        ...this.subTitleConfig,
      };
      this.json.body.push(payload);
    }

    if (this.tableData && this.tableData.length) {
      const payload: FactSet = {
        type: "FactSet",
        facts: [],
      };

      this.tableData.forEach(([label, value], i) => {
        const fact: Fact = {
          title: label,
          value,
        };
        payload.facts.push(fact);
      });

      this.json.body.push(payload);
    }

    if (this.image) {
      const payload: ImageBlock = {
        type: "Image",
        url: this.image,
        horizontalAlignment: "Center",
        size: "Large",
        ...this.imageConfig,
      };
      this.json.body.push(payload);
    }

    if (this.choices.length) {
      this.needsSubmit = true;
      const payload: ChoiceBlock = {
        type: "Input.ChoiceSet",
        id: "choiceSelect",
        value: "0", // Pick 1st one?
        isMultiSelect: false,
        isVisible: true,
        choices: this.choices,
        ...this.choiceConfig,
      };
      this.json.body.push(payload);
    }

    if (this.inputPlaceholder) {
      this.needsSubmit = true;
      const payload = {
        type: "Input.Text",
        placeholder: this.inputPlaceholder,
        ...this.inputConfig,
      };
      this.json.body.push(payload);
    }

    if (Object.keys(this.dateData).length) {
      const { id, type, label } = this.dateData;
      if (label) {
        this.json.body.push({
          type: "TextBlock",
          text: label,
          wrap: true,
        });
      }
      if (id && type) {
        this.json.body.push({ id, type });
      }
      this.needsSubmit = true;
    }

    if (Object.keys(this.timeData).length) {
      const { id, type, label } = this.timeData;
      if (label) {
        this.json.body.push({
          type: "TextBlock",
          text: label,
          wrap: true,
        });
      }
      if (id && type) {
        this.json.body.push({ id, type });
      }
      this.needsSubmit = true;
    }

    if (this.texts.length) {
      this.texts.forEach((text) => {
        this.json.body.push(text);
      });
    }

    if (this.needsSubmit) {
      interface SubmitPayload {
        type: string;
        title: string;
        data?: unknown;
      }
      const payload: SubmitPayload = {
        type: "Action.Submit",
        title: this.buttonLabel,
      };
      if (this.attachedData && Object.keys(this.attachedData).length) {
        payload.data = this.attachedData;
      }

      if (this.json.actions?.length) {
        this.json.actions.push(payload);
      } else {
        this.json.actions = [payload];
      }
    } else {
      if (this.attachedData && Object.keys(this.attachedData).length) {
        console.log(
          `attachedData ignore, you must call at least either .setInput(), .setChoices, .setDate, .setTime, to pass through data with an adaptive card`
        );
      }
    }

    if (this.url) {
      const payload: LinkButton = {
        type: "Action.OpenUrl",
        title: this.urlLabel,
        url: this.url,
      };
      if (this.json.actions) {
        this.json.actions.push(payload);
      } else {
        this.json.actions = [payload];
      }
    }

    if (this.details.length) {
      if (!this.json.actions) {
        this.json.actions = [];
      }

      this.details.forEach((detail) => this.json.actions.push(detail));
    }

    return this.json;
  }

  card(config: Partial<AbbreviatedSpeedyCard> = {}): SpeedyCard {
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

  renderFull() {
    const cardData = this.render();
    const fullPayload = {
      roomId: "__REPLACE__ME__",
      markdown: "Fallback text **here**",
      attachments: [cardData],
    };
    return fullPayload;
  }
}

// todo: better types
export interface EasyCardSpec {
  $schema: string;
  type: string;
  version: string;
  body: any;
  actions?: any;
  backgroundImage?: string;
}
