import { MyStack } from "./MyStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    environment: {
      token: process.env.token as string, // bot token, make one here: https://developer.webex.com/my-apps/new
      secret: process.env.secret as string, // webhook secret
    },
    bundle: {
      format: "esm",
    },
  });
  app.stack(MyStack);
}
