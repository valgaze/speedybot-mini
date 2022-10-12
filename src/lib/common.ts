export const API = {
  getMessage_Details: "https://webexapis.com/v1/messages",
  getAttachmentDetails: "https://webexapis.com/v1/attachment/actions",
  getMembershipDetails: "https://webexapis.com/v1/memberships",
  getPersonDetails: "https://webexapis.com/v1/people",
  sendMessage: "https://webexapis.com/v1/messages",
  createWebhook: "https://webexapis.com/v1/webhooks",
  deleteWebhook: `https://webexapis.com/v1/webhooks`,
  getWebhooks: "https://webexapis.com/v1/webhooks",
  getSelf: "https://webexapis.com/v1/people/me",
  deleteMessage: "https://webexapis.com/v1/messages",
};

export const constants = {
  actionKeyword: "speedybot_action",
};
export const actions = {
  location_abort: "location_abort",
  delete_message: "delete_message",
  delete_stash_card: "delete_stash_card",
};

import { SpeedyCard } from "./cards";
export const placeholder = "__REPLACE__ME__";
import { ENVELOPES, RequestTypes } from "./payloads.types";

/**
 * Ingest incoming webhook envelope, determine RequestType
 * @param payload
 *
 *
 * @returns
 */
export const typeIdentifier = (payload: ENVELOPES): RequestTypes => {
  let type;
  if (payload.resource === "messages") {
    if ("files" in payload.data && payload.data.files?.length) {
      const { files = [] } = payload.data;
      if (files && files.length) {
        type = "FILE";
      }
    } else {
      type = "TEXT";
    }
  }
  if (payload.resource === "attachmentActions") {
    type = "AA";
  }

  if (payload.resource === "memberships") {
    if (payload.event === "deleted") {
      type = "MEMBERSHIP:REMOVE";
    }
    if (payload.event === "created") {
      type = "MEMBERSHIP:ADD";
    }
  }
  return type as RequestTypes;
};

export const checkers = {
  isSpeedyCard(input: SpeedyCard | object): boolean {
    return (
      typeof input === "object" &&
      "render" in input &&
      typeof input.render === "function"
    );
  },
  isCard(cardCandidate: any | SpeedyCard): boolean {
    if (this.isSpeedyCard(cardCandidate)) return true;
    const stringifiedPayload = JSON.stringify(cardCandidate);
    const isCard =
      stringifiedPayload.includes("AdaptiveCard") &&
      stringifiedPayload.includes("$schema") &&
      stringifiedPayload.includes("version");
    return isCard;
  },
  isEmail(candidate: string) {
    // Only really care about joe@joe.com joe@joe.joe.com joe@a.io
    // Should probably get a Regex @ some point... // https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php
    const res = candidate.includes("@") && candidate.includes(".");
    return res;
  },
};

export type RequestOps = {
  "content-type"?: string;
  method?: string;
  headers?: any;
  raw?: boolean;
  [key: string]: any;
};

export type CoreMakerequest<T = any> = (
  url: string,
  body: any,
  opts: RequestOps
) => Promise<T> | T;

// Workhorse makeRequest w/ fetch, can be stubbed for testing
export const makeRequest = async (
  url: string,
  body: any,
  opts: RequestOps = {}
) => {
  const defaultConfig = {
    method: "POST",
    "content-type": "application/json;charset=UTF-8",
    raw: false,
  };
  const contentType = opts["content-type"] || defaultConfig["content-type"];
  const init: {
    method: string;
    headers: any;
    body?: any;
    [key: string]: any;
  } = {
    method: opts.method ? opts.method : defaultConfig.method,
    headers: {
      "content-type": contentType,
      Authorization: `Bearer ${opts.token}`,
      ...(opts.headers || {}),
    },
  };
  if (opts.method === "POST") {
    init.body = opts.raw ? body : JSON.stringify(body);
  }
  const response = await fetch(url, init);
  return response;
};

/**
 * Cheap way to get content-dispoition header & content-type and get extension
 * @param url
 * @returns
 */
export const peekFile = async (
  token: string,
  url: string
): Promise<{ fileName: string; type: string; extension: string }> => {
  // file URL is the endpoint
  const res = await makeRequest(
    url,
    {},
    {
      method: "HEAD",
      token: token,
    }
  );
  const type = res.headers.get("content-type") as string;
  const contentDispo = res.headers.get("content-disposition") as string;
  const fileName = contentDispo.split(";")[1].split("=")[1].replace(/\"/g, "");
  const extension = fileName.split(".").pop() || "";

  return {
    fileName,
    type,
    extension,
  };
};
export const pickRandom = (list: any[] = []) => {
  return list[Math.floor(Math.random() * list.length)];
};

// Fill a string or list of strings with a template
export const fillTemplate = (utterances: string[], template: any) => {
  let payload;
  if (typeof utterances !== "string") {
    payload = pickRandom(utterances) || "";
  } else {
    payload = utterances;
  }

  const replacer: any = (
    utterance: string,
    target: string,
    replacement: string
  ) => {
    if (!utterance.includes(`$[${target}]`)) {
      return utterance;
    }

    return replacer(
      utterance.replace(`$[${target}]`, replacement),
      target,
      replacement
    );
  };

  for (const key in template) {
    const val = template[key];
    payload = replacer(payload, key, val);
  }

  return payload;
};

export const finale = () => `
Server(less) Time: ${new Date().toString()}
*
* ╔═╗ ╔═╗ ╔═╗ ╔═╗ ╔╦╗ ╦ ╦ ╔╗  ╔═╗ ╔╦╗
* ╚═╗ ╠═╝ ║╣  ║╣   ║║ ╚╦╝ ╠╩╗ ║ ║  ║
* ╚═╝ ╩   ╚═╝ ╚═╝ ═╩╝  ╩  ╚═╝ ╚═╝  ╩ HUB
*
* Setup Instructions (make your own bot): https://github.com/valgaze/speedybot-mini
* `;
