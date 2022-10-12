import { MessageEnvelope, Message_Details } from "../src/lib/payloads.types";

export const aa_envelope = {
  id: "idPlaceholder1234",
  name: "1997-0219T23:37:26.396Z_attachmentActions",
  targetUrl: "https://speedybot-hub.valgaze.workers.dev",
  resource: "attachmentActions",
  event: "created",
  orgId: "orgId_placeholder",
  createdBy: "createdBy_placeholder",
  appId: "appId_placeholder",
  ownedBy: "creator",
  status: "active",
  created: "1997-0219T23:37:26.474Z",
  actorId: "personId_placeholder",
  data: {
    id: "aaId_placeholder",
    type: "submit",
    messageId: "messageIdAA_placeholder",
    personId: "personId_placeholder",
    roomId: "roomId_placeholder",
    created: "2022-10-17T05:08:21.128Z",
  },
};

export const aa_details = {
  id: "aaId_placeholder",
  type: "submit",
  messageId: "messageIdAA_placeholder",
  inputs: {
    chip_action: "ping",
  },
  personId: "personId_placeholder",
  roomId: "roomId_placeholder",
  created: "2022-10-17T05:08:21.128Z",
};

export const file_envelope = {
  id: "file_idPlaceholder1234",
  name: "1997-0219T23:37:26.396Z_firehose",
  targetUrl: "https://speedybot-hub.valgaze.workers.dev",
  resource: "messages",
  event: "created",
  orgId: "orgId_placeholder",
  createdBy: "createdBy_placeholder",
  appId: "appId_placeholder",
  ownedBy: "creator",
  status: "active",
  created: "1997-0219T23:37:26.468Z",
  actorId: "personId_placeholder",
  data: {
    id: "fileId_placeholder",
    roomId: "roomId_placeholder",
    roomType: "direct",
    files: ["https://webexapis.com/v1/contents/fileId_placeholder"],
    personId: "personId_placeholder",
    personEmail: "person@organization.com",
    created: "2022-10-17T05:07:39.115Z",
    isVoiceClip: false,
  },
};

export const file_details = {
  id: "fileId_placeholder",
  roomId: "roomId_placeholder",
  roomType: "direct",
  text: "aaa",
  files: ["https://webexapis.com/v1/contents/fileId_placeholder"],
  personId: "personId_placeholder",
  personEmail: "person@organization.com",
  created: "2022-10-17T05:07:39.115Z",
  isVoiceClip: false,
};

export const message_envelope = {
  id: "Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1dFQkhPT0svYWI1YTljNGEtMGE2My00OGIyLThhN2QtNDc4YzY3MzY4Yzcx",
  name: "1997-0219T23:37:26.396Z_firehose",
  targetUrl: "https://speedybot-hub.valgaze.workers.dev",
  resource: "messages",
  event: "created",
  orgId: "orgId_placeholder",
  createdBy: "createdBy_placeholder",
  appId: "appId_placeholder",
  ownedBy: "creator",
  status: "active",
  created: "1997-0219T23:37:26.468Z",
  actorId: "personId_placeholder",
  data: {
    id: "messagePayloadId_placeholder",
    roomId: "roomId_placeholder",
    roomType: "direct",
    personId: "personId_placeholder",
    personEmail: "person@organization.com",
    created: "2022-10-17T05:23:03.900Z",
  },
};

export const message_details = {
  id: "messagePayloadId_placeholder",
  roomId: "roomId_placeholder",
  roomType: "direct",
  text: "ping",
  personId: "personId_placeholder",
  personEmail: "person@organization.com",
  created: "2022-10-17T05:23:03.900Z",
};

export const selfData = {
  id: "idPlaceholder",
  emails: ["speedybot@webex.bot"],
  phoneNumbers: [],
  displayName: "speedybot",
  nickName: "speedybot",
  userName: "speedybot",
  avatar: "https://avatar-prod-us-east-2.webexcontent.com/aaabbbccc",
  orgId: "orgIdPlaceholder",
  created: "1997-07-17T00:25:21.532Z",
  status: "unknown",
  type: "bot",
};

export const APIMapper = (url, method: "GET" | "POST") => {
  const map = { "https://webexapis.com/v1/people/me": selfData };
  return map[url];
};

export const makeMessage = (
  text: string
): { envelope: MessageEnvelope; details: Message_Details } => {
  return {
    envelope: message_envelope as MessageEnvelope,
    details: { ...message_details, text },
  };
};
