[speedybot-mini](../README.md) / [Exports](../modules.md) / Speedybot

# Class: Speedybot<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` = `never` |

## Table of contents

### Constructors

- [constructor](Speedybot.md#constructor)

### Properties

- [FileHandler](Speedybot.md#filehandler)
- [\_config](Speedybot.md#_config)
- [handlers](Speedybot.md#handlers)
- [nluHandler](Speedybot.md#nluhandler)
- [rootList](Speedybot.md#rootlist)
- [secrets](Speedybot.md#secrets)

### Methods

- [IncomingWebhooks](Speedybot.md#incomingwebhooks)
- [actionHandler](Speedybot.md#actionhandler)
- [addSecret](Speedybot.md#addsecret)
- [addSecrets](Speedybot.md#addsecrets)
- [buildDetails](Speedybot.md#builddetails)
- [checkList](Speedybot.md#checklist)
- [checkStrings](Speedybot.md#checkstrings)
- [contains](Speedybot.md#contains)
- [deleteMessage](Speedybot.md#deletemessage)
- [detectType](Speedybot.md#detecttype)
- [every](Speedybot.md#every)
- [exact](Speedybot.md#exact)
- [exposeToken](Speedybot.md#exposetoken)
- [fuzzy](Speedybot.md#fuzzy)
- [getAuthor](Speedybot.md#getauthor)
- [getData](Speedybot.md#getdata)
- [getSecret](Speedybot.md#getsecret)
- [getSelf](Speedybot.md#getself)
- [getToken](Speedybot.md#gettoken)
- [isEnvelope](Speedybot.md#isenvelope)
- [isHuman](Speedybot.md#ishuman)
- [nlu](Speedybot.md#nlu)
- [noMatch](Speedybot.md#nomatch)
- [onCamera](Speedybot.md#oncamera)
- [onFile](Speedybot.md#onfile)
- [onSubmit](Speedybot.md#onsubmit)
- [peekFile](Speedybot.md#peekfile)
- [processIncoming](Speedybot.md#processincoming)
- [processSubmit](Speedybot.md#processsubmit)
- [processText](Speedybot.md#processtext)
- [regex](Speedybot.md#regex)
- [setConfig](Speedybot.md#setconfig)
- [setHandler](Speedybot.md#sethandler)
- [setToken](Speedybot.md#settoken)
- [setWelcome](Speedybot.md#setwelcome)

## Constructors

### constructor

• **new Speedybot**<`T`\>(`config?`, `makeRequest?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` = `never` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config?` | `string` \| `Config` | `undefined` |
| `makeRequest` | `CoreMakerequest`<`any`\> | `RequesterFunc` |

#### Defined in

[lib/speedybot.ts:214](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L214)

## Properties

### FileHandler

• **FileHandler**: ``null`` \| `FileHandlerFunc`<`any`\> = `null`

#### Defined in

[lib/speedybot.ts:229](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L229)

___

### \_config

• `Private` **\_config**: `Config`

#### Defined in

[lib/speedybot.ts:198](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L198)

___

### handlers

• `Private` **handlers**: `Object`

#### Index signature

▪ [key: `string`]: `GenericHandlerFunc` \| ``null``

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ALL` | ``null`` \| `GenericHandlerFunc`<`any`\> |
| `NO_MATCH` | ``null`` \| `GenericHandlerFunc`<`any`\> |
| `camera` | ``null`` \| `GenericHandlerFunc`<`any`\> |
| `file` | ``null`` \| `GenericHandlerFunc`<`any`\> |
| `submit` | ``null`` \| `GenericHandlerFunc`<`any`\> |

#### Defined in

[lib/speedybot.ts:230](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L230)

___

### nluHandler

• `Private` **nluHandler**: ``null`` \| `NLUHandlerFunc`<`any`\> = `null`

#### Defined in

[lib/speedybot.ts:245](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L245)

___

### rootList

• `Private` **rootList**: `RootList` = `[]`

#### Defined in

[lib/speedybot.ts:228](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L228)

___

### secrets

• `Private` **secrets**: `Partial`<`Secrets`<`T`\>\> = `{}`

#### Defined in

[lib/speedybot.ts:70](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L70)

## Methods

### IncomingWebhooks

▸ **IncomingWebhooks**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `card` | (`config?`: `Partial`<`AbbreviatedSpeedyCard`\>) => [`SpeedyCard`](SpeedyCard.md) |
| `dm` | (`personIdOrEmail`: `string`, `message`: `string` \| `string`[] \| [`SpeedyCard`](SpeedyCard.md), `fallback?`: `string`) => `Promise`<`Response`\> |
| `dmDataAsFile` | (`personIdOrEmail`: `string`, `data`: `any`, `extensionOrFileName`: `string`, `contentType`: ``null``, `textLabel?`: `string`, `overrides`: { `toPersonEmail?`: `string` ; `toPersonId?`: `string`  }) => `Promise`<`Response`\> |
| `sendRoom` | (`roomId`: `string`, `message`: `string` \| `string`[] \| [`SpeedyCard`](SpeedyCard.md)) => `Promise`<`void`\> |
| `sendRoomDataAsFile` | (`roomId`: `string`, `data`: `any`, `extensionOrFileName`: `string`, `contentType`: ``null``, `textLabel?`: `string`, `overrides`: { `toPersonEmail?`: `string` ; `toPersonId?`: `string`  }) => `Promise`<`Response`\> |
| `snippet` | (`data`: `any`, `dataType`: `string`) => `string` |

#### Defined in

[lib/speedybot.ts:196](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L196)

___

### actionHandler

▸ **actionHandler**(`details`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `details` | `AA_Details` |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/speedybot.ts:894](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L894)

___

### addSecret

▸ **addSecret**<`K`\>(`key`, `value`): `void`

Add a secret to your Speedybot bot instance. Note bot tokens are special are are still set by [setToken](Speedybot.md#settoken)
**Note:** Once you add a secret it is accessible on the instance so be careful

## Example

```ts

import { Speedybot } from 'speedybot-mini'
type MySecrets = 'special_token1' | 'special_token2'

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// Add secret (can happen anytime to keep bots portable)

CultureBot.addSecret('special_token1', 'xxx-yyy')
CultureBot.getSecret('special_token1') // 'xxx-yyy'

CultureBot.addSecrets({'special_token2':'aaa-bbb'})
CultureBot.getSecret('special_token2') // 'aaa-bbb'

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 $bot.send('This is the hi greeting handler!')
})

CultureBot.contains('trigger', async ($bot, msg) => {
 $bot.send('About to trigger the hi trigger')
 $bot.trigger('hi', msg)
})

```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:111](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L111)

___

### addSecrets

▸ **addSecrets**(`secrets`): `void`

Add a several secrets at once to your Speedybot bot instance. Note bot tokens are special are are still set by [setToken](Speedybot.md#settoken)
**Note:** Once you add a secret it is accessible on the instance so be careful

## Example

```ts

import { Speedybot } from 'speedybot-mini'
type MySecrets = 'special_token1' | 'special_token2'

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// Add secret (can happen anytime to keep bots portable)

CultureBot.addSecrets({'special_token1': 'xxx-yyy', 'special_token2':'aaa-bbb'})
CultureBot.getSecret('special_token1') // 'xxx-yyy'
CultureBot.getSecret('special_token2') // 'aaa-bbb'

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 $bot.send('This is the hi greeting handler!')
})

CultureBot.contains('trigger', async ($bot, msg) => {
 $bot.send('About to trigger the hi trigger')
 $bot.trigger('hi', msg)
})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `secrets` | `Partial`<`Secrets`<`T`\>\> |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:150](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L150)

___

### buildDetails

▸ **buildDetails**(`type`, `envelope`): `Promise`<{ `author`: `SelfData` ; `details`: `Message_Details` \| `AA_Details` \| `File_Details`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `RequestTypes` |
| `envelope` | `ENVELOPES` |

#### Returns

`Promise`<{ `author`: `SelfData` ; `details`: `Message_Details` \| `AA_Details` \| `File_Details`  }\>

#### Defined in

[lib/speedybot.ts:964](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L964)

___

### checkList

▸ `Private` **checkList**(`incoming?`): `number`

Returns look up index of matching handler if one exists

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `incoming` | `string` | `""` |

#### Returns

`number`

#### Defined in

[lib/speedybot.ts:844](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L844)

___

### checkStrings

▸ `Private` **checkStrings**(`check`, `incoming`, `flag?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `check` | `string` |
| `incoming` | `string` |
| `flag?` | `Object` |
| `flag.exact?` | `boolean` |
| `flag.fuzzy?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[lib/speedybot.ts:247](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L247)

___

### contains

▸ **contains**(`keyword`, `cb`): `void`

Register a handler thats matches on a string or list of strings

 Note: This will match if the target phrase is the 1st or only word in a sentence

**Important:** If you want to match on the input phrase located *anywhere* in an input phrase,
use .fuzzy. If .fuzzy and .contains contain the same matching word, the first registered handler will take precedence
Any fuzzy matches occur **anywhere** in the input from the user (if you want only the 1st word see .contains)

```ts

// This agent will match for ex.  hi, hey how's it going, hey
// Will not match: hi!!, heya how are you?
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
  $bot.send('You matched!')
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` \| `string`[] |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:330](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L330)

___

### deleteMessage

▸ `Private` **deleteMessage**(`msgId`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgId` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[lib/speedybot.ts:904](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L904)

___

### detectType

▸ **detectType**(`envelope`): `RequestTypes`

#### Parameters

| Name | Type |
| :------ | :------ |
| `envelope` | `ENVELOPES` |

#### Returns

`RequestTypes`

#### Defined in

[lib/speedybot.ts:648](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L648)

___

### every

▸ **every**(`handler`, `skipList?`): `Object`

Register a handler that runs on **EVERY** message sent to an agent
Note: You can optionally pass in a list of keywords to skip

```ts

// This agent will match for only 'Hi'
// Will not match: hi, hi!!, heya how are you?
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(['bingo', 'bongo'], ($bot, msg) => {
 if (msg.text === 'bingo') {
   $bot.send('bongo')
 } else {
   $bot.send('bingo')
 }
})

// Run on every input except the words 'bingo' and 'bongo'
CultureBot.every(async ($bot, msg) => {
  $bot.send('You matched because you said a word containing x!')
}).config({skipList: ['bingo', 'bongo']})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `handler` | `MsgHandler` | `undefined` |
| `skipList` | `string`[] | `[]` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `config` | (`catchallConfig`: { `skipList?`: `string`[]  }) => `void` |

#### Defined in

[lib/speedybot.ts:506](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L506)

___

### exact

▸ **exact**(`keyword`, `cb`): `void`

Register a handler thats matches on a string **exactly**

 Note: This will match if the target phrase has a case-sensitive match

```ts

// This agent will match for only 'Hi'
// Will not match: hi, hi!!, heya how are you?
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.exact("hi", async ($bot, msg) => {
  $bot.send('You matched!')
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:368](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L368)

___

### exposeToken

▸ **exposeToken**(): `string`

#### Returns

`string`

#### Defined in

[lib/speedybot.ts:225](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L225)

___

### fuzzy

▸ **fuzzy**(`keyword`, `cb`): `void`

Register a handler that "fuzzily" matches input from a user

Any fuzzy matches occur **anywhere** in the input from the user (if you want only the 1st word see [Speedybot.contains](Speedybot.md#contains))

```ts

// This agent will match for ex.  hi, hi!!, here is a sentence hi and bye
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.fuzzy(["hi", "hey"], async ($bot, msg) => {
  $bot.send('You matched!')
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` \| `string`[] |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:283](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L283)

___

### getAuthor

▸ `Private` **getAuthor**(`personId`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `personId` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[lib/speedybot.ts:981](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L981)

___

### getData

▸ **getData**(`type`, `envelope`): `Promise`<`Message_Details` \| `AA_Details` \| `File_Details`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `RequestTypes` |
| `envelope` | `ENVELOPES` |

#### Returns

`Promise`<`Message_Details` \| `AA_Details` \| `File_Details`\>

#### Defined in

[lib/speedybot.ts:1018](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L1018)

___

### getSecret

▸ **getSecret**<`K`\>(`key`): `undefined` \| `string`

Retrieve a secret set on your Speedybot bot instance. Note bot tokens are special are are still set by [setToken](Speedybot.md#settoken)
**Note:** Once you add a secret it is accessible on the instance so be careful

## Example

```ts

import { Speedybot } from 'speedybot-mini'
type MySecrets = 'special_token1' | 'special_token2'

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot<MySecrets>('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// Add secret (can happen anytime to keep bots portable)

CultureBot.addSecret('special_token1', 'xxx-yyy')
CultureBot.getSecret('special_token1') // 'xxx-yyy'

CultureBot.addSecrets({'special_token2':'aaa-bbb'})
CultureBot.getSecret('special_token2') // 'aaa-bbb'

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 $bot.send('This is the hi greeting handler!')
})

CultureBot.contains('trigger', async ($bot, msg) => {
 $bot.send('About to trigger the hi trigger')
 $bot.trigger('hi', msg)
})

```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`undefined` \| `string`

#### Defined in

[lib/speedybot.ts:192](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L192)

___

### getSelf

▸ `Private` **getSelf**(): `Promise`<`SelfData`\>

#### Returns

`Promise`<`SelfData`\>

#### Defined in

[lib/speedybot.ts:1004](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L1004)

___

### getToken

▸ **getToken**(): `string`

#### Returns

`string`

#### Defined in

[lib/speedybot.ts:960](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L960)

___

### isEnvelope

▸ **isEnvelope**(`candidate`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `candidate` | `any` |

#### Returns

`boolean`

#### Defined in

[lib/speedybot.ts:1058](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L1058)

___

### isHuman

▸ `Private` **isHuman**(`personId`, `fullPayload?`): `Promise`<`boolean` \| `SelfData`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `personId` | `string` | `undefined` |
| `fullPayload` | `boolean` | `false` |

#### Returns

`Promise`<`boolean` \| `SelfData`\>

#### Defined in

[lib/speedybot.ts:995](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L995)

___

### nlu

▸ **nlu**(`cb`): `void`

🌟SPECIAL🌟 Conversational Design convenience handler

Use this handler to send user input to a NLP/NLU

Any registered keywords handled with your agent will be ignored and not sent to the NLU system

```ts

// This agent will match for ping, pong, anything else will be sent to a
// 3rd-party service for content and conversation design

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["ping","pong"], async ($bot, msg) => {
  $bot.send('You matched!')
})

CultureBot.nlu("hi", async ($bot, msg, api) => {
  const payload = await api('https://www.nluservice.com', { text: msg.text }, )
  const res = await payload.text()
  $bot.send(`Response: ${text}`)
})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `NLUHandlerFunc`<`any`\> |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:409](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L409)

___

### noMatch

▸ **noMatch**(`handler`): `void`

Register a handler when there is no matching handler for a user's input

If you're not using an NLU system, it's a good idea to acknowledge a user's
request isn't servicable rather than leaving them hanging

```ts

// This agent will match for only 'Hi'
// Will not match: hi, hi!!, heya how are you?
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.noMatch(async ($bot, msg) => {
  $bot.send(`Bummer, no match for ${msg.text}`)
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:467](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L467)

___

### onCamera

▸ **onCamera**(`handler`): `void`

Camera handler-- will trigger by default for png, jpeg, & jpg

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | `FileHandlerFunc`<`any`\> | ```ts import { Speedybot } from "speedybot-mini"; // 1) Initialize your bot const CultureBot = new Speedybot("__REPLACE__MEE__"); // 2) Export your bot export default CultureBot;  // Add a camera handler CultureBot.onCamera(($bot, msg, fileData) => {    const { fileName, extension, type } = fileData;    $bot.send(`You sent a photo: ${fileName} ${extension} ${type}`);    // file data available under fileData.data }); ``` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:550](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L550)

___

### onFile

▸ **onFile**(`handler`): `Object`

Register a handler when a user uploads a file to an agent

With optional confi
- matchText: boolean-- should any text attached to file upload also be processed? (default false)
- excludeFiles: string[]-- any files not to exclude from handling

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.onFile(async ($bot, msg, fileData) => {
   const { fileName, extension, type } = fileData;
   $bot.send(`You sent a file: ${fileName} ${extension} ${type}`);
   // file data available under fileData.data
}).config({matchText: true})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `FileHandlerFunc`<`any`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `config` | (`fileConfig`: `Partial`<{ `excludeFiles`: `string`[] ; `matchText`: `boolean`  }\>) => `void` |

#### Defined in

[lib/speedybot.ts:586](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L586)

___

### onSubmit

▸ **onSubmit**(`handler`): `Object`

Register a handler when a user sends data from an Adaptive Card. Any attached data will be available under `msg.data.inputs`

In the example below this is the data available on card submission: `{"cardName":"mySpecialCard7755","inputData":"My opinion is 123"}`:

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains("card", ($bot) => {
 $bot.send('Here is a card to share your opinion')
 $bot.send(
 $bot
   .card({ title: "Here is a card" })
   .setData({ cardName: "mySpecialCard7755" })
   .setInput("What is your opinion?")
 );

})

CultureBot.onSubmit(async ($bot, msg, fileData) => {
  $bot.send(`You submitted ${JSON.stringify(msg.data.inputs)}`);
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `AAHandler` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `config` | (`fileConfig`: `Partial`<{ `excludeFiles`: `string`[] ; `matchText`: `boolean`  }\>) => `void` |

#### Defined in

[lib/speedybot.ts:636](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L636)

___

### peekFile

▸ **peekFile**(`url`): `Promise`<{ `extension`: `string` ; `fileName`: `string` ; `type`: `string`  }\>

Cheap way to get content-dispoition header & content-type and get extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<{ `extension`: `string` ; `fileName`: `string` ; `type`: `string`  }\>

#### Defined in

[lib/speedybot.ts:1052](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L1052)

___

### processIncoming

▸ **processIncoming**(`envelope`): `Promise`<{ `incomingProcessed`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `envelope` | `ENVELOPES` |

#### Returns

`Promise`<{ `incomingProcessed`: `boolean`  }\>

#### Defined in

[lib/speedybot.ts:666](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L666)

___

### processSubmit

▸ **processSubmit**(`details`): ``null`` \| `GenericHandlerFunc`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `details` | `AA_Details` |

#### Returns

``null`` \| `GenericHandlerFunc`<`any`\>

#### Defined in

[lib/speedybot.ts:795](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L795)

___

### processText

▸ **processText**(`incoming?`, `skipNoMatchFallback?`): ``null`` \| `GenericHandlerFunc`<`any`\>

If worst case (user enters text
 and we need to search for it)
Check the list and find a 1-1 match or "contains"

Note: All queries are lower-cased

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `incoming` | `string` | `""` |
| `skipNoMatchFallback` | `boolean` | `false` |

#### Returns

``null`` \| `GenericHandlerFunc`<`any`\>

#### Defined in

[lib/speedybot.ts:822](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L822)

___

### regex

▸ **regex**(`rx`, `cb`): `void`

Register a handler thats matches based on a Regular Expression

```ts

// This agent will match for only 'Hi'
// Will not match: hi, hi!!, heya how are you?
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.regex(new RegExp('x'), async ($bot, msg) => {
  $bot.send('You matched because you said a word containing x!')
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `rx` | `RegExp` |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:436](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L436)

___

### setConfig

▸ `Private` **setConfig**<`T`\>(`route`, `data`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | `string` |
| `data` | `T` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:525](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L525)

___

### setHandler

▸ `Private` **setHandler**(`handlerType`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handlerType` | `string` |
| `handler` | `any` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:554](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L554)

___

### setToken

▸ **setToken**(`token`): `void`

Add a bot token used to authenticate to APIs

## Example

```ts

// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

CultureBot.exposeToken() // '__REPLACE__ME__'

CultureBot.setToken('__REPLACE__ME__NEW_TOKEN!')

 CultureBot.exposeToken() // __REPLACE__ME__NEW_TOKEN
// Add secret (can happen anytime to keep bots portable)

CultureBot.addSecret('special_token1', 'xxx-yyy')
CultureBot.getSecret('special_token1') // 'xxx-yyy'

CultureBot.addSecrets({'special_token2':'aaa-bbb'})
CultureBot.getSecret('special_token2') // 'aaa-bbb'

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 $bot.send('This is the hi greeting handler!')
})

CultureBot.contains('trigger', async ($bot, msg) => {
 $bot.send('About to trigger the hi trigger')
 $bot.trigger('hi', msg)
})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:956](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L956)

___

### setWelcome

▸ **setWelcome**(`handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `string` \| [`SpeedyCard`](SpeedyCard.md) |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:646](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/speedybot.ts#L646)
