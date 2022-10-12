import { SpeedyCard } from "./cards";
import { BotInst } from "./bot";

/**
 * Configuratio Options for onFile handler
 *
 * matchText (defauls to false): if any text accompanies an uploaded file it should be matched too
 * excludeFiles: list of extensions (without dots) that onFile will ignore, ex. ['png','jpg','jpeg']
 *
 */
export type FileConfig = Partial<{
  matchText: boolean;
  excludeFiles: string[];
}>;
export type SpeedyFile<T = any> = {
  fileName: string;
  extension: string;
  type: string;
  data: ArrayBuffer | T;
  markdownSnippet: string;
};

// Speedybot-hub specific types
export type RequestTypes = "AA" | "FILE" | "TEXT";
export type ENVELOPES = MessageEnvelope | AA_Envelope | FileEnvelope;
export type DETAILS = Message_Details | AA_Details | File_Details;

// Get self data from token
export type SelfData = {
  id: string;
  emails: string[];
  phoneNumbers: any[];
  displayName: string;
  nickName: string;
  userName: string;
  avatar: string;
  orgId: string;
  created: Date;
  status: string;
  type: string; // person or bot
  firstName: string;
  lastName: string;
  lastModified: Date;
  lastActivity: Date;
};
// Pass to create message
export type ToMessage = {
  roomId?: string;
  parentId?: string;
  toPersonId?: string;
  toPersonEmail?: string;
  text?: string;
  markdown?: string;
  files?: string[];
  attachments?: {
    contentType?: string;
    content?: any; // type this properly
  }[];
};

// Render card from designer or SpeedyCard
export type Card =
  | SpeedyCard
  | {
      contentType: "application/vnd.microsoft.card.adaptive" | string;
      content: {
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json";
        type: "AdaptiveCard";
        version: "1.0" | string;
        body: any[];
        actions: any[];
      };
    };

export type Message_Details = {
  id: string;
  roomId: string;
  roomType: string;
  text: string;
  personId: string;
  personEmail: string;
  html?: string;
  mentionedPeople?: string[];
  created: Date | string;
  files?: string[];
};
// Combine these, make text optional on files
export type File_Details = {
  id: string;
  roomId: string;
  roomType: string;
  text?: string;
  personId: string;
  personEmail: string;
  html?: string;
  mentionedPeople?: string[];
  created: Date | string;
  files: string[];
};

// Messages, text
export type MessageEnvelope = {
  id: string;
  name: string;
  targetUrl: string;
  resource: "messages";
  event: string;
  orgId: string;
  createdBy: string;
  appId: string;
  ownedBy: string;
  status: string;
  created: Date | string;
  actorId: string;
  data: Message_Details;
};

export type FileEnvelope = {
  id: string;
  name: string;
  targetUrl: string;
  resource: string;
  event: string;
  orgId: string;
  createdBy: string;
  appId: string;
  ownedBy: string;
  status: string;
  created: Date | string;
  actorId: string;
  data: {
    id: string;
    roomId: string;
    roomType: string;
    files: string[];
    personId: string;
    personEmail: string;
    created: string | Date;
  };
};

// Attachment Actions

// Incoming, could probably be combined w/ Message_Envelope differentiated by resource field
export type AA_Envelope = {
  id: string;
  name: string;
  targetUrl: string;
  resource: "attachmentActions";
  event: string;
  orgId: string;
  createdBy: string;
  appId: string;
  ownedBy: string;
  status: string;
  created: Date | string;
  actorId: string;
  data: {
    id: string;
    type: string;
    messageId: string;
    personId: string;
    roomId: string;
    created: Date | string;
  };
};

export type AA_Details = {
  id: string;
  type: string;
  messageId: string;
  inputs: any;
  personId: string;
  roomId: string;
  created: Date | string;
};

// - Attachment Actions message envelope:
// AAEnvelope.data.id: use this to retrieve input from Adaptive Card: https://developer.webex.com/docs/api/v1/attachment-actions/get-attachment-action-details
// AAEnvelope.data.messageId: this to get original card JSON & weirdness (AA_Details_WeirdOne): https://developer.webex.com/docs/api/v1/messages/get-message-details
export type AA_Details_WeirdOne = {
  id: string;
  roomId: string;
  roomType: string;
  text?: string;
  attachments: Attachment[];
  personId: string;
  personEmail: string;
  created: Date | string;
};

export interface Attachment {
  contentType: string;
  content: {
    $schema: string;
    type: string;
    version: string;
    body: any[];
    actions: any[];
  };
}

// Msg parameter to quicklyy snag useful data
// Requires an http call
export type RootTrigger<T = any> = {
  id: string;
  authorId: string;
  data: T;
  author: SelfData;
};

export type GeneralHandler<T = any> = (
  bot: BotInst,
  msg: T
) => void | Promise<void>;
export type MsgHandler = GeneralHandler<
  RootTrigger<Message_Details> & { text: string }
>;
export type AAHandler = GeneralHandler<RootTrigger<AA_Details>>;
export type FileRootHandler = GeneralHandler<RootTrigger<File_Details>>;

export type RequestOps = {
  "content-type"?: string;
  method?: string;
  headers?: any;
  raw?: boolean;
  [key: string]: any;
};

export const reqTypesEnum = Object.freeze({
  AA: "AA",
  FILE: "FILE",
  TEXT: "TEXT",
});

export type MessageReply = {
  id: string;
  roomId: string;
  roomType: string;
  text: string;
  personId: string;
  personEmail: string;
  markdown: string;
  html: string;
  created: Date | string;
  attachments?: {
    contentType?: string;
    content?: any; // type this properly
  }[];
};
