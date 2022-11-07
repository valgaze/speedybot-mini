## Webhooks

Note: If you don't want to worry about webhooks at all, see the zero-config **[websockets example](./../examples/websockets/README.md)**

- **[Register Webhooks](#register-webhooks)**
- **[webhooks Security + Secrets](#webhook-secrets)**
- **[Using nodejs crypto](#nodejs)**
- **[Using web crypto](#web-cryto-for-workers-v8-isolates)**

## Register Webhooks

Once you have a server/worker/whatever running your agent, you'll need to setup webhooks so chat traffic can reach your agent.

- Set up webhooks with **[speedybot garage 🔧🤖](https://codepen.io/valgaze/pen/MWVjEZV)**

![sb](./assets/speedybot_garage_demo.gif)

## Webhook secrets

To help secure your agent, you can add a "secret" when creating webhooks.

If you add a secret when creating a webhook on each incoming request will receive a hashed version of the request body under the header **X-Spark-Signature**

**Bottom line:** DO THIS. With your webhook secret you can take SHA-1 representation of the request body and if it matches the signature on the header proceed otherwise simply discard the request.

Note: All of the samples in the **[examples directory](./../examples/)** of this repo have reference implementations of validating webhooks appropriate to each platform

## Reference implementations

## NodeJS

```js
const crypto = require("crypto");

// validate signature
const validateSignature = (secret, signature, requestData) => {
  const hmac = crypto.createHmac("sha1", secret);
  if (typeof requestData === "string") {
    hmac.update(requestData);
  } else {
    hmac.update(JSON.stringify(requestData));
  }

  const isValid = hmac.digest("hex") === signature;
  return isValid;
};

const requestBody = {
  data: {
    a: 1,
    b: 2,
    c: {
      d: 3,
    },
  },
  signature: "01e0cb6a53731b9615b483335d77d97023410c72",
};
const secret = "myBongoSecret";

const res = validateSignature(secret, requestBody.signature, requestBody.data);

console.log("is valid?", res);
```

## Web Crypto (for "Workers", V8 Isolates)

```js
const validateSignature = async (secret, signature, requestData) => {
  const stringyBody =
    typeof requestData !== "string" ? JSON.stringify(requestData) : requestData;
  const algo = {
    name: "HMAC",
    hash: "SHA-1",
  };
  const enc = {
    name: "UTF-8",
  };
  const hmacKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    algo,
    false,
    ["sign"]
  );
  const hmacData = await crypto.subtle.sign(
    algo,
    hmacKey,
    new TextEncoder().encode(stringyBody)
  );

  const bufferToHex = (buffer) => {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
      .join("");
  };
  const hmacDataHex = bufferToHex(hmacData);
  return hmacDataHex === signature;
};

const requestBody = {
  data: {
    a: 1,
    b: 2,
    c: {
      d: 3,
    },
  },
  signature: "01e0cb6a53731b9615b483335d77d97023410c72",
};
const secret = "myBongoSecret";

const res = validateSignature(
  secret,
  requestBody.signature,
  requestBody.data
).then((val) => console.log("is valid?", val));
```

## Resources

- https://developer.webex.com/blog/using-a-webhook-secret
- https://community.cisco.com/t5/collaboration-blogs/using-a-webhook-secret/ba-p/3662176
- https://blogs.cisco.com/learning/chatops-how-to-secure-your-webex-bot
