## Webhooks

- **[Register Webhooks](#register-webhooks)**
- **[webhooks Security + Secrets](#webhook-secrets)**
- **[Using nodejs crypto](#nodejs)**
- **[Using web crypto](#web-cryto-for-workers-v8-isolates)**

## Register Webhooks

Once you have a server/worker/whatever running your bot, you need to set up Webhooks which will send chat traffic to a publically-addressable URL

- Set up webhooks with **[speedybot garage 🔧🤖](https://codepen.io/valgaze/pen/MWVjEZV)**

![sb](./assets/speedybot_garage_demo.gif)

## Webhook secrets

If you add a secret when creating a webhook, you will received a hashed version of the request body under the header **X-Spark-Signature**

Using your secret, you can hash the request body and compare the result with what you receive in X-Spark-Signature. If it does not match, discard the request and do not pass it forward into Speedybot

## More details on webhook secrets

- https://developer.webex.com/blog/using-a-webhook-secret
- https://community.cisco.com/t5/collaboration-blogs/using-a-webhook-secret/ba-p/3662176
- https://blogs.cisco.com/learning/chatops-how-to-secure-your-webex-bot

## Reference implementations

Combining requestBody and secret should yield the signature below

```ts
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
```

## NodeJS

<details>
  <summary>NodeJS</summary>
  
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

console.log("# is valid?", res);
```
</details>

## Web Cryto (for "Workers", V8 Isolates)

<details>
  <summary>Web Crypto</summary>

```js
// TODO
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

// validate signature
const validateSignature = (secret, signature, requestData) => {
    let isValid = false
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

console.log("# is valid?", res);
````

</details>
