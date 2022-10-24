## AWS Lambda

Follow the steps below to deploy a secure serverless chat agent running on AWS Lambda

Note: This example uses the **[Serverless Stack (SST)](https://serverless-stack.com/)** toolchain for provisioning, deployment of infrastructure. SST is built on top of a version **[AWS Cloud Development Kit (cdk)](https://aws.amazon.com/cdk/)** let's you express your infrastructure needs as spec/code. SST is definitely not required but is the quickest route to a serverless deployment.

## 1. Fetch repo & install dependencies

```
git clone https://github.com/valgaze/speedybot-mini
cd speedybot-mini
cd examples/aws-lambda
npm install
```

## 2. Set your bot access token

- If you have an existing bot, get its token here: **[https://developer.webex.com/my-apps](https://developer.webex.com/my-apps)**

- If you don't have a bot, create one and save the token from here: **[https://developer.webex.com/my-apps/new/bot](https://developer.webex.com/my-apps/new/bot)**

- Copy the file **[.env.example](.env.example)** as `.env` in the root of your project and save your access token under the `token` field.

Note: The `.env` file will never be aded to source control, **[further details here](https://docs.sst.dev/environment-variables)**

## 3. Set up your AWS credentials on your machine

Note: You'll need an AWS account that has authorization/billing to create lambda functions

3a. Setup IAM here: https://sst.dev/chapters/create-an-iam-user.html

3b. Setup AWS CLI: https://sst.dev/chapters/configure-the-aws-cli.html

## 4. Deploy your bot and get its public URL

Run this command from the project directory:

```
npm run deploy
```

If deployment is successful, you should find that your url that looks something like this: https://abcd123456.execute-api.us-east-1.amazonaws.com

## 4. Register webhooks using Speedybot Garage

In order for your agent to process incoming messages, you'll need to register your agent's URL to receive webhooks for chat

Based on **[stacks/MyStack.ts](./stacks/MyStack.ts)**, append `/speedybot` so the final URL for your agent should look something like this:

**https://abcd123456.execute-api.us-east-1.amazonaws.com/speedybot**

⭐️ You can use **[Speedybot bot-garage 🔧🤖](https://codepen.io/valgaze/full/MWVjEZV)**, (source available for inspection **[here](https://github.com/valgaze/speedybot-mini/blob/deploy/docs/speedybot_garage.html)**) and select "webhooks" to register your agent, ex:

![image](./assets/speedybot_garage_demo.gif)

## 4b. (Alternative) Register webhooks using the command line

In a terminal enter the following command:

- Replace t argument with your token
- Replce w argument with your lambda url
- Can add optional s argument for a webhook secret (see **[below for details](#webhook-secrets)**)

```sh
npm init -y speedybot webhook create -- -t _token_here_ -w https://abcd123456.execute-api.us-east-1.amazonaws.com/speedybot
```

Tip: If you're having trouble, you can enter your token & URL step by step by entering `npm init -y speedybot webhook create`

## Webhook Secrets

<details><summary>Webhook Secrets</summary>

You can secure your webhooks using "secrets", below are how to use them

1. Come up with a secret and save it under `secret` in your project's root **[.env file](./.env.example)**

2. Create a new webhook in **[Speedybot bot-garage 🔧🤖](https://codepen.io/valgaze/full/MWVjEZV)** & include the secret

3. In **[settings/config.ts](./settings/config.ts)** add a validation function that looks something like this:

```
import crypto from 'crypto'
import { APIGatewayProxyEventV2, Context } from 'aws-lambda'

async function validate(body: any, event: APIGatewayProxyEventV2, ctx: Context) {
  const validateSignature = <T = any>(
    signature: string,
    secret: string,
    requestBody: T
  ): boolean => {
    const hmac = crypto.createHmac('sha1', secret)
    if (typeof requestBody === 'string') {
      hmac.update(requestBody)
    } else {
      hmac.update(JSON.stringify(requestBody))
    }
    const isValid = hmac.digest('hex') === signature
    return isValid
  }
  const signature = event.headers['x-spark-signature']
  const secret = process.env.secret // passed through via .env
  if (secret) {
    const proceed = validateSignature(
      signature as string,
      secret as string,
      body
    )
    return { proceed: proceed }
  }
}
```

</details>

## Websocket Mode

<details><summary>Websocket Mode</summary>

For rapid development, you can run your lambda function locally and forward responses to a **live** lambda (note this takes advantage of SST's **[Live Lambda Development feature](https://docs.sst.dev/live-lambda-development)**)
)

Start local websocket mode by running

```sh
npm start
```

Enter CTRL-C to shut off websocket mode & deploy and changes with `npm run deploy`

</details>
