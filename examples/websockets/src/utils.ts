import "cross-fetch/polyfill";
import dotenv from "dotenv";
import path from "path";

const [, , cliCommand] = process.argv;

// Expects .env to get token on BOT_TOKEN
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

import { init } from "webex";
export type Listeners = {
  [key: string]: Function;
};

export type AbbreviatedEvent = {
  data: {
    personId: string;
  };
};
export type EventCb = (evt: AbbreviatedEvent) => any;
export type StubbedWebEx = {
  internal: {
    services: { waitForService(...args): Promise<string> };
    device: { unregister(...args): Promise<unknown> };
  };
  request(...args): void;
  people: {
    get(id: string): Promise<{ id: string }>;
  };
  messages: {
    stopListening(): Promise<void>;
    listen(): Promise<void>;
    on(event: string, callback: EventCb): any;
  };
  attachmentActions: {
    listen(): Promise<void>;
    on(event: string, callback: EventCb): any;
  };
};
export type Events = "message" | "submit" | "file" | "camera";

// Trick to resolve "excessive device registrations" issue
const resetDevices = async (token: string) => {
  type Device = {
    url: string;
    webSocketUrl: string;
    services: unknown;
  };
  // Get devices
  const deviceList: Response = await fetch(
    "https://wdm-a.wbx2.com/wdm/api/v1/devices",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { devices = [] }: { devices: Device[] } = await deviceList.json();
  for (const device of devices) {
    const { url } = device;
    if (url) {
      await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
};

export class Websocket {
  public webexRef!: StubbedWebEx;
  public me: any;
  public listeners: Listeners = {};
  constructor(public token: string) {}
  on(eventName: Events, handler: Function) {
    this.listeners[eventName] = handler;
  }

  async getSelf() {
    const { id } = await this.webexRef.people.get("me");
    this.me = id;
  }

  async init() {
    const config = {
      credentials: {
        access_token: this.token,
      },
    };
    this.webexRef = await init(config);
  }

  async start() {
    await this.init();
    await Promise.all([
      this.getSelf(),
      this.webexRef.messages.listen(),
      this.webexRef.attachmentActions.listen(),
    ]);

    // messages
    this.webexRef.messages.on("created", (event: any) => {
      if (event.data.personId !== this.me) {
        this.onMessage({ ...event, targetUrl: "websocket" });
      }
    });

    this.webexRef.attachmentActions.on("created", (event: any) => {
      this.onSubmit({ ...event, targetUrl: "websocket" });
    });
  }

  onMessage(event: any) {
    if (this.listeners.message) {
      this.listeners.message(event);
    }
  }

  onSubmit(event: any) {
    if (this.listeners.submit) {
      this.listeners.submit(event);
    }
  }

  async stop() {
    await this.webexRef.internal.device.unregister();
    await this.webexRef.messages.stopListening();
  }

  async resetDevices() {
    return resetDevices(this.token);
  }
}

if (cliCommand) {
  if (cliCommand === "reset") {
    resetDevices(process.env.BOT_TOKEN as string).then((_) =>
      console.log("Devices reset")
    );
  }
}
