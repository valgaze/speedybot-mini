[speedybot-mini](../README.md) / [Exports](../modules.md) / Speedybot

# Class: Speedybot

## Table of contents

### Constructors

- [constructor](Speedybot.md#constructor)

### Properties

- [FileHandler](Speedybot.md#filehandler)
- [\_config](Speedybot.md#_config)
- [handlers](Speedybot.md#handlers)
- [nluHandler](Speedybot.md#nluhandler)
- [rootList](Speedybot.md#rootlist)

### Methods

- [IncomingWebhooks](Speedybot.md#incomingwebhooks)
- [actionHandler](Speedybot.md#actionhandler)
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

## Constructors

### constructor

• **new Speedybot**(`config?`, `makeRequest?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config?` | `string` \| `Config` | `undefined` |
| `makeRequest` | `CoreMakerequest`<`any`\> | `RequesterFunc` |

#### Defined in

[lib/speedybot.ts:85](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L85)

## Properties

### FileHandler

• **FileHandler**: ``null`` \| `FileHandlerFunc`<`any`\> = `null`

#### Defined in

[lib/speedybot.ts:100](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L100)

___

### \_config

• `Private` **\_config**: `Config`

#### Defined in

[lib/speedybot.ts:69](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L69)

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

[lib/speedybot.ts:101](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L101)

___

### nluHandler

• `Private` **nluHandler**: ``null`` \| `NLUHandlerFunc`<`any`\> = `null`

#### Defined in

[lib/speedybot.ts:116](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L116)

___

### rootList

• `Private` **rootList**: `RootList` = `[]`

#### Defined in

[lib/speedybot.ts:99](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L99)

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

[lib/speedybot.ts:67](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L67)

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

[lib/speedybot.ts:763](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L763)

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

[lib/speedybot.ts:794](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L794)

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

[lib/speedybot.ts:713](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L713)

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

[lib/speedybot.ts:118](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L118)

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

[lib/speedybot.ts:201](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L201)

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

[lib/speedybot.ts:773](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L773)

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

[lib/speedybot.ts:517](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L517)

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

[lib/speedybot.ts:377](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L377)

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

[lib/speedybot.ts:239](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L239)

___

### exposeToken

▸ **exposeToken**(): `string`

#### Returns

`string`

#### Defined in

[lib/speedybot.ts:96](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L96)

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

[lib/speedybot.ts:154](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L154)

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

[lib/speedybot.ts:811](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L811)

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

[lib/speedybot.ts:848](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L848)

___

### getSelf

▸ `Private` **getSelf**(): `Promise`<`SelfData`\>

#### Returns

`Promise`<`SelfData`\>

#### Defined in

[lib/speedybot.ts:834](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L834)

___

### getToken

▸ **getToken**(): `string`

#### Returns

`string`

#### Defined in

[lib/speedybot.ts:790](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L790)

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

[lib/speedybot.ts:888](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L888)

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

[lib/speedybot.ts:825](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L825)

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

[lib/speedybot.ts:280](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L280)

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

[lib/speedybot.ts:338](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L338)

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

[lib/speedybot.ts:421](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L421)

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

[lib/speedybot.ts:457](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L457)

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

[lib/speedybot.ts:507](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L507)

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

[lib/speedybot.ts:882](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L882)

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

[lib/speedybot.ts:535](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L535)

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

[lib/speedybot.ts:664](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L664)

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

[lib/speedybot.ts:691](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L691)

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

[lib/speedybot.ts:307](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L307)

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

[lib/speedybot.ts:396](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L396)

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

[lib/speedybot.ts:425](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L425)

___

### setToken

▸ **setToken**(`token`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:786](https://github.com/valgaze/speedybot-mini/blob/48476ff/src/lib/speedybot.ts#L786)
