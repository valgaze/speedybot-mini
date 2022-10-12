/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import CultureBot from "./config";
import { ENVELOPES, finale } from "speedybot-mini";
export interface Env {
  BOT_TOKEN: string;
}
const validateHeader = <T = any>(
  secret: string,
  signature: string,
  body: T
) => {
  let proceed = false;
  // Using web-crypto generate hmac using secret
  // check digest of request body to signature

  return proceed;
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    CultureBot.setToken(env.BOT_TOKEN);
    const json = await request.json();
    ctx.waitUntil(
      new Promise<void>(async (resolve, reject) => {
        try {
          // Do whatever checks/validation, processIncoming presumes it has good input
          const isEnvelope = CultureBot.isEnvelope(json);
          if (isEnvelope) {
            await CultureBot.processIncoming(json as ENVELOPES);
          }
        } catch (e) {
          reject(e);
          return new Response(
            `Something happened, but backend is up and running: ${e}`
          );
        }
      })
    );
    return new Response(finale());
  },
};
