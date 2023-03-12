[speedybot-mini](../README.md) / [Exports](../modules.md) / BotInst

# Class: BotInst

Root bot object used in handlers-- enshrined with many convenience helpers & lessons learned the hard way

![cards](../media/first_spin.gif)

## Table of contents

### Constructors

- [constructor](BotInst.md#constructor)

### Properties

- [API](BotInst.md#api)
- [config](BotInst.md#config)
- [fallbackText](BotInst.md#fallbacktext)
- [locales](BotInst.md#locales)
- [meta](BotInst.md#meta)
- [roomId](BotInst.md#roomid)
- [token](BotInst.md#token)

### Methods

- [api](BotInst.md#api-1)
- [banner](BotInst.md#banner)
- [buildImLink](BotInst.md#buildimlink)
- [buildLink](BotInst.md#buildlink)
- [buildMeetingLink](BotInst.md#buildmeetinglink)
- [buildSpaceLink](BotInst.md#buildspacelink)
- [card](BotInst.md#card)
- [clearScreen](BotInst.md#clearscreen)
- [dangerCard](BotInst.md#dangercard)
- [debugCard](BotInst.md#debugcard)
- [deleteMessage](BotInst.md#deletemessage)
- [dm](BotInst.md#dm)
- [fillTemplate](BotInst.md#filltemplate)
- [generateFileName](BotInst.md#generatefilename)
- [getFile](BotInst.md#getfile)
- [getSelf](BotInst.md#getself)
- [guessContentType](BotInst.md#guesscontenttype)
- [handleExtension](BotInst.md#handleextension)
- [log](BotInst.md#log)
- [lookUp](BotInst.md#lookup)
- [peekFile](BotInst.md#peekfile)
- [pickRandom](BotInst.md#pickrandom)
- [rando](BotInst.md#rando)
- [say](BotInst.md#say)
- [send](BotInst.md#send)
- [sendCard](BotInst.md#sendcard)
- [sendDataAsFile](BotInst.md#senddataasfile)
- [sendDataFromUrl](BotInst.md#senddatafromurl)
- [sendJSON](BotInst.md#sendjson)
- [sendRandom](BotInst.md#sendrandom)
- [sendSnippet](BotInst.md#sendsnippet)
- [sendTemplate](BotInst.md#sendtemplate)
- [sendURL](BotInst.md#sendurl)
- [skyCard](BotInst.md#skycard)
- [snippet](BotInst.md#snippet)
- [stashCard](BotInst.md#stashcard)
- [successCard](BotInst.md#successcard)
- [thread](BotInst.md#thread)
- [translate](BotInst.md#translate)
- [trigger](BotInst.md#trigger)
- [warningCard](BotInst.md#warningcard)

## Constructors

### constructor

• **new BotInst**(`config`, `makeRequest?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | [`BotConfig`](../modules.md#botconfig)<`any`\> | `undefined` |
| `makeRequest` | `CoreMakerequest`<`any`\> | `RequesterFunc` |

#### Defined in

[lib/bot.ts:64](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L64)

## Properties

### API

• `Private` **API**: `Object` = `API`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `createWebhook` | `string` |
| `deleteMessage` | `string` |
| `deleteWebhook` | `string` |
| `getAttachmentDetails` | `string` |
| `getMembershipDetails` | `string` |
| `getMessage_Details` | `string` |
| `getPersonDetails` | `string` |
| `getSelf` | `string` |
| `getWebhooks` | `string` |
| `sendMessage` | `string` |

#### Defined in

[lib/bot.ts:62](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L62)

___

### config

• **config**: [`BotConfig`](../modules.md#botconfig)<`any`\>

___

### fallbackText

• `Private` **fallbackText**: `string` = `"Sorry, it appears your client does not support rendering Adaptive Cards, see here for more info: https://developer.webex.com/docs/api/guides/cards"`

#### Defined in

[lib/bot.ts:51](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L51)

___

### locales

• **locales**: `Object` = `{}`

 Locales holder, passed in by Speedybot but hacky escape hatch available too

#### Defined in

[lib/bot.ts:61](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L61)

___

### meta

• **meta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Defined in

[lib/bot.ts:54](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L54)

___

### roomId

• **roomId**: `string` = `""`

#### Defined in

[lib/bot.ts:50](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L50)

___

### token

• `Private` **token**: `string` = `""`

#### Defined in

[lib/bot.ts:53](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L53)

## Methods

### api

▸ **api**<`T`\>(`request`, `requestInitr?`): `Promise`<`T`\>

Reach an api that returns JSON-- alias to fetch

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const adviceResponse = await $bot.api('https://api.adviceslip.com/advice')
   const adviceText = $bot.lookUp(adviceResponse, 'slip.advice')
   $bot.send(`Here' some advice: ${adviceText}`)
})
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `string` \| `Request` |
| `requestInitr?` | `RequestInit` \| `Request` |

#### Returns

`Promise`<`T`\>

#### Defined in

[lib/bot.ts:222](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L222)

___

### banner

▸ **banner**(`msg`, `style?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | `string` | `undefined` |
| `style` | ``"success"`` \| ``"danger"`` \| ``"warning"`` \| ``"sky"`` \| ``"yolo"`` | `"danger"` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/bot.ts:1329](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1329)

___

### buildImLink

▸ **buildImLink**(`target`, `label?`, `noBold?`): `string`

Generate a hyperlink to send a message to a person/agent

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 const email = 'joe@joe.com'
 const label = 'Send a message to Joe'
 const link = $bot.buildImLink(email, label)
 $bot.send(link)
})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `label?` | `string` | `undefined` |
| `noBold` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[lib/bot.ts:1613](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1613)

___

### buildLink

▸ **buildLink**(`target`, `label?`, `noBold?`): `string`

Creates a markdown bolded hyperlink

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 const link = $bot.buildLink('https://youtu.be/6A8W77m-ZTw?t=114')
 $bot.send('Is it biscotti or biscotto?')
})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `label?` | `string` | `undefined` |
| `noBold` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[lib/bot.ts:1534](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1534)

___

### buildMeetingLink

▸ **buildMeetingLink**(`target`, `label?`, `noBold?`): `string`

Generate a meeting hyperlink to open a meeting with a person

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 const email = 'joe@joe.com'
 const label = 'Click here to talk to Joe'
 const link = $bot.buildMeetingLink(email, label)
 $bot.send(link)
})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `label?` | `string` | `undefined` |
| `noBold` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[lib/bot.ts:1579](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1579)

___

### buildSpaceLink

▸ **buildSpaceLink**(`target`, `label?`, `noBold?`): `string`

Generate a hyperlink to a space/room

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
 const roomId = 'Y2lzY29zL3ajsLpmVzL1JPT00vNTBjNma'
 const label = 'Go to the special space'
 const link = $bot.buildSpaceLink(roomId, label)
 $bot.send(link)
})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | `string` | `undefined` |
| `label?` | `string` | `undefined` |
| `noBold` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[lib/bot.ts:1655](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1655)

___

### card

▸ **card**(`config?`): [`SpeedyCard`](SpeedyCard.md)

Convenience helper that creates a SpeedyCard

![cards](../media/demo_sendcard.gif)

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
  const cardData = $bot.card({
    title: "Speedybot Hub",
    subTitle: "Sign the paperwork",
    chips: ["ping", "pong", "hi",],
    image: "https://github.com/valgaze/speedybot-mini/raw/deploy/docs/assets/logo.png?raw=true",
    url: "https://github.com/valgaze/speedybot-mini"
  });
  $bot.send(cardData);
 })

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<`AbbreviatedSpeedyCard` & { `label`: `string`  }\> |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/bot.ts:439](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L439)

___

### clearScreen

▸ **clearScreen**(`repeatCount?`): `Promise`<`MessageReply`\>

Clear the screen on desktop clients (useful for demos)

```ts
```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
  $bot.send('This will more or less disappear...')
  $bot.clearScreen()
 })
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `repeatCount` | `number` | `50` |

#### Returns

`Promise`<`MessageReply`\>

#### Defined in

[lib/bot.ts:1168](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1168)

___

### dangerCard

▸ **dangerCard**(`payload?`): [`SpeedyCard`](SpeedyCard.md)

Returns an instance of a dangerCard. dangerCards have blue skylike background:

![cards](../media/colored_cards.gif)

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const danger = $bot.dangerCard({
    title: '⛔️DANGER-- do not do that!⛔️',
    subTitle: 'There is a very important reason not to do that',
    chips: ['ping', 'pong'],
   })
    $bot.send(danger)
 })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Partial`<`AbbreviatedSpeedyCard`\> | (title, subtitle, etc) |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

SpeedyCard

#### Defined in

[lib/bot.ts:1323](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1323)

___

### debugCard

▸ **debugCard**(`payload?`): [`SpeedyCard`](SpeedyCard.md)

Returns an instance of a debugCard

![cards](../media/colored_cards.gif)

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const debug = $bot.debugCard({
    title: 'Testing 321',
    subTitle: 'Testing 456',
    chips: ['ping', 'pong'],
    })
    $bot.send(debug)
 })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Partial`<`AbbreviatedSpeedyCard`\> | (title, subtitle, etc) |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

SpeedyCard

#### Defined in

[lib/bot.ts:1388](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1388)

___

### deleteMessage

▸ **deleteMessage**(`messageId`): `Promise`<`any`\>

Delete a message (need a valid messageId)

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
  const msg = await $bot.send('My message to be deleted')
  $bot.deleteMessage(msg.id)
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageId` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[lib/bot.ts:562](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L562)

___

### dm

▸ **dm**(`personIdOrEmail`, `message`, `fallback?`): `Promise`<`Response`\>

Send a 1-1/DM message to a user based on their email or personId

You can send a string or a card

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
 $bot.dm('username@domain.com', 'Here is a secret message')

 $bot.dm('aaa-bbb-ccc-ddd-eee', $bot.card({title:'biscotti', subTitle:'Is it biscotti or biscotto?' url: 'https://youtu.be/6A8W77m-ZTw?t=114', chips:['biscotti','biscotto']}))

})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `personIdOrEmail` | `string` |
| `message` | `string` \| `string`[] \| [`SpeedyCard`](SpeedyCard.md) |
| `fallback?` | `string` |

#### Returns

`Promise`<`Response`\>

#### Defined in

[lib/bot.ts:265](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L265)

___

### fillTemplate

▸ `Private` **fillTemplate**(`utterances`, `template`): `any`

Fill in a template (usually used by sendTemplate)
```ts
  const utterances = ['Howdy $[name], here's $[flavor]', '$[name], here\'s your $[flavor] ice cream']
  const template = { name: 'Joe', flavor: 'strawberry' }
  const response = $bot.fillTemplate(utterances, template) // "Joe, here's your strawberry ice cream"

  const response2 = $bot.fillTemplate('Hi there the time is $[date]', {date: new Date().toString()})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `utterances` | `string`[] |
| `template` | `any` |

#### Returns

`any`

#### Defined in

[lib/bot.ts:116](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L116)

___

### generateFileName

▸ `Private` **generateFileName**(): `string`

#### Returns

`string`

#### Defined in

[lib/bot.ts:719](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L719)

___

### getFile

▸ **getFile**(`url`, `opts?`): `Promise`<{ `data`: `any` ; `extension`: `string` ; `fileName`: `string` ; `markdownSnippet`: `string` ; `type`: `string`  }\>

Get a (secured) file's contents, probably would use this for examining uploaded files
like JSON, excel (xlsx), etc

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opts` | `Object` |
| `opts.responseType?` | ``"arraybuffer"`` \| ``"json"`` |

#### Returns

`Promise`<{ `data`: `any` ; `extension`: `string` ; `fileName`: `string` ; `markdownSnippet`: `string` ; `type`: `string`  }\>

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
  const [fileUrl] = trigger.message.files || []
  const fileData = await $bot.getFile(fileUrl, {
    responseType: 'arraybuffer',
  })
  const { fileName, extension, type } = fileData
  $bot.say(
    `The file you uploaded (${fileName}), is a ${extension} file of type ${type}`
  )
   // with fileData.data you have access to an arrayBuffer with the raw bytes of that file
})

```

#### Defined in

[lib/bot.ts:652](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L652)

___

### getSelf

▸ **getSelf**(): `Promise`<`SelfData`\>

Get bot's meta data

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const botData = await $bot.getSelf()
   $bot.send(`Hi I'm a bot & my name is ${botData.displayName}`)
 })
```

#### Returns

`Promise`<`SelfData`\>

#### Defined in

[lib/bot.ts:525](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L525)

___

### guessContentType

▸ `Private` **guessContentType**(`extensionOrFileName`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `extensionOrFileName` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[lib/bot.ts:843](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L843)

___

### handleExtension

▸ `Private` **handleExtension**(`input?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `""` |

#### Returns

`string`

#### Defined in

[lib/bot.ts:730](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L730)

___

### log

▸ **log**(...`payload`): `void`

Logs to system

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   $bot.log('Testing 123')
   $bot.log(`Input text: ${msg.text}`)
 })
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...payload` | `any` |

#### Returns

`void`

#### Defined in

[lib/bot.ts:1129](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1129)

___

### lookUp

▸ **lookUp**(`locale`, `lookup?`, `fallback?`): `any`

Traverse a property lookup path on a object
fallback to a value (if provided) whenever
path is invalid

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const myData = {a:1,b:2,c:{d:3}}
   const succeed = $bot.lookUp(myData, 'a.b.c.d', 'fallback') // 3
   const fail = $bot.lookUp(myData, 'a.b.ce.e.f.g', 'fallback') // 'fallback'
   $bot.send(`succeed: ${succeed}, fail: ${fail}`)
 })
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `locale` | `any` | `undefined` |
| `lookup` | `string` | `""` |
| `fallback?` | `string` | `undefined` |

#### Returns

`any`

#### Defined in

[lib/bot.ts:1276](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1276)

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

[lib/bot.ts:612](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L612)

___

### pickRandom

▸ **pickRandom**(`list?`): `any`

Grab a random element from a list
```ts
const list = [1, 2, 3];
const $bot = { pickRandom(x: any[]) {} };
$bot.pickRandom(list); // 2
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `list` | `any`[] | `[]` |

#### Returns

`any`

#### Defined in

[lib/bot.ts:90](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L90)

___

### rando

▸ **rando**(): `string`

Generate a random string of 11 characters (letters + numbers)

#### Returns

`string`

#### Defined in

[lib/bot.ts:726](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L726)

___

### say

▸ **say**<`T`\>(`payload`): `Promise`<`T`\>

Legacy alias for $bot.send

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `string` \| `ToMessage` \| `Card` \| { `[key: string]`: `string` \| `number` \| `any`; `roomId`: `string`  } |

#### Returns

`Promise`<`T`\>

#### Defined in

[lib/bot.ts:1670](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1670)

___

### send

▸ **send**<`T`\>(`payload`): `Promise`<`T`\>

$bot.send, core "workhorse" utility that can send whatever you throw at it
roomId by default is whatever is bound to bot instance

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('token_placeholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
 // Send a simple string
 $bot.send('Send a string')

 // Send a card: https://developer.webex.com/docs/api/guides/cards
 $bot.send($bot.card({title:'My special card', subTitle:'My great subtitle', chips:['ping','pong','hi']}))

 // Send a traditional ToMessage
 const payload = {
   toPersonEmail: 'fake_name@org.com',
   markdown: 'some **great** content',
 }
 $bot.send(payload)
 })

```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `MessageReply` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `string` \| `ToMessage` \| `Card` |

#### Returns

`Promise`<`T`\>

#### Defined in

[lib/bot.ts:345](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L345)

___

### sendCard

▸ **sendCard**<`T`\>(`payload`): `Promise`<`T`\>

Legacy alias for $bot.sendCard

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `Card` |

#### Returns

`Promise`<`T`\>

#### Defined in

[lib/bot.ts:1685](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1685)

___

### sendDataAsFile

▸ **sendDataAsFile**(`data`, `extensionOrFileName`, `contentType?`, `textLabel?`, `overrides?`): `Promise`<`Response`\>

Generate a file and fill it with the data you provide and send to user to download

At minimum, provide the file data & desired file extension

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const myData = { a: 1, b: 2, c: [1,2,3,'hello', 'bonjour']}
   $bot.sendDataAsFile(myData, 'json')
   // with fileData.data you have access to an arrayBuffer with the raw bytes of that file
})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `any` | `undefined` |
| `extensionOrFileName` | `string` | `undefined` |
| `contentType` | ``null`` | `null` |
| `textLabel?` | `string` | `undefined` |
| `overrides` | `Object` | `{}` |
| `overrides.roomId?` | `string` | `undefined` |
| `overrides.toPersonEmail?` | `string` | `undefined` |
| `overrides.toPersonId?` | `string` | `undefined` |

#### Returns

`Promise`<`Response`\>

#### Defined in

[lib/bot.ts:776](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L776)

___

### sendDataFromUrl

▸ **sendDataFromUrl**(`url`, `fallbackText?`): `Promise`<`MessageReply`\>

Provide a URL but it gets returned as a file

Filetypes: 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'gif', 'png'
See more info here: https://developer.webex.com/docs/basics

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const pdfURL = 'https://speedybot.valgaze.com'
   $bot.sendDataFromUrl(pdfURL, "Here's a doc!")
 })
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `fallbackText` | `string` | `" "` |

#### Returns

`Promise`<`MessageReply`\>

#### Defined in

[lib/bot.ts:1101](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1101)

___

### sendJSON

▸ **sendJSON**<`T`\>(`data`, `label?`): `Promise`<`void`\>

Display a snippet of nicely-formatted (alias for $bot.sendSnippet)
JSON data or code-snippet to the user

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const specialData = {a:1, b:2, c: [1,2,3]}
   $bot.sendJSON(specialData)
 })
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `label?` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/bot.ts:1203](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1203)

___

### sendRandom

▸ **sendRandom**(`list?`): `Promise`<`MessageReply`\>

Grab a random element from a list
```ts
const list = ['hi, 'hello', 'yo'];
$bot.sendRandom(list); // 'hello'
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `list` | `any`[] | `[]` |

#### Returns

`Promise`<`MessageReply`\>

#### Defined in

[lib/bot.ts:101](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L101)

___

### sendSnippet

▸ **sendSnippet**(`data`, `label?`, `dataType?`, `fallbackText?`): `Promise`<`void`\>

Display a snippet to the user

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const specialData = {a:1, b:2, c: [1,2,3]}
   $bot.sendSnippet(specialData)
 })
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | `undefined` |
| `label` | `string` | `""` |
| `dataType` | `string` | `"json"` |
| `fallbackText?` | `string` | `undefined` |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/bot.ts:1228](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1228)

___

### sendTemplate

▸ **sendTemplate**(`utterances`, `template?`): `Promise`<`MessageReply`\>

Send a url wrapped in a card

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
  const utterances = [
    'Howdy $[name], here is a $[flavor]',
    '$[name], one $[flavor] ice cream for you',
  ]
  const template = { name: 'Joe', flavor: 'strawberry' }
  $bot.sendTemplate(utterances, template)
 })
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `utterances` | `string`[] |
| `template` | `any` |

#### Returns

`Promise`<`MessageReply`\>

#### Defined in

[lib/bot.ts:157](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L157)

___

### sendURL

▸ **sendURL**(`url`, `title?`, `buttonTitle?`): `Promise`<`MessageReply`\>

Send a url wrapped in a card

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
    const url = 'https://codepen.io/valgaze/pen/PoEpxpb'
   $bot.sendURL(url, 'Check this out', '💫 See Resource')
})
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `title?` | `string` | `undefined` |
| `buttonTitle` | `string` | `"Go"` |

#### Returns

`Promise`<`MessageReply`\>

#### Defined in

[lib/bot.ts:185](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L185)

___

### skyCard

▸ **skyCard**(`payload?`): [`SpeedyCard`](SpeedyCard.md)

Returns an instance of a skyCard. SkyCards have blue skylike background:

![cards](../media/colored_cards.gif)

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const card = $bot.skyCard({title: '☁️ What a pleasant card ☁️'})
   $bot.send(card)
 })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Partial`<`AbbreviatedSpeedyCard`\> | (title, subtitle, etc) |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

SpeedyCard

#### Defined in

[lib/bot.ts:1495](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1495)

___

### snippet

▸ **snippet**(`data`, `dataType?`): `string`

Takes input data and wraps in markdown backticks

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `any` | `undefined` |
| `dataType` | `string` | `"json"` |

#### Returns

`string`

#### Defined in

[lib/bot.ts:1139](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1139)

___

### stashCard

▸ **stashCard**(`secret`, `message?`): [`SpeedyCard`](SpeedyCard.md)

Temporary card that you can stash away data and destroy

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
  const msg = 'mysecret'
  $bot.stashCard('mySecret')
})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `secret` | `string` |
| `message?` | `string` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/bot.ts:598](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L598)

___

### successCard

▸ **successCard**(`payload?`): [`SpeedyCard`](SpeedyCard.md)

Returns an instance of a SuccessCard. SuccessCards have blue skylike background:

![cards](../media/colored_cards.gif)

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const success = $bot.successCard({
    title: '🌟You did it!🎉',
    subTitle: 'Whatever you did, good at job at doing it',
    chips: ['ping', 'pong'],
   })
    $bot.send(success)
 })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Partial`<`AbbreviatedSpeedyCard`\> | (title, subtitle, etc) |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

SpeedyCard

#### Defined in

[lib/bot.ts:1463](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1463)

___

### thread

▸ **thread**(`thread`): `Promise`<`void`\>

Send a message and attach replies

Current Limitations :(
- Only 1st message can be a card
- Replies can only be strings
- With more than 2-3 replies, order is not guaranteed (replies can arrive out of order)

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"], async ($bot, msg) => {
  $bot.thread([$bot.card().setTitle('hello world!').setChips(['a','b','c']), 'Pick one of the above!', 'Come on do it!'])
})

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `thread` | [`string` \| [`SpeedyCard`](SpeedyCard.md), ...(string \| ToMessage)[]] |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/bot.ts:987](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L987)

___

### translate

▸ **translate**(`locale`, `lookup`, `template?`, `fallback?`): `any`

Translate a string based on provided locale config

```ts
// locale data (gets specified into Speedybot config)
const locales = {
 en: {
   greetings: {
     welcome: 'Hello!!'
   }
 },
 es: {
   greetings: {
     welcome: 'hola!!'
   }
 },
 cn: {
   greetings: {
     welcome: '你好'
   }
 }
}

const config = {
 token: 'abc',
 locales
}
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot(config);

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const eng = $bot.translate('en', 'greetings.welcome') // 'Hello!!'
   const esp = $bot.translate('es', 'greetings.welcome') // 'hola!!'
   const chn = $bot.translate('cn', 'greetings.welcome') // '你好'
   const fallback = $bot.translate('whoops_doesnt_exist', 'greetings.welcome', 'Hey there fallback!')
   $bot.send(`${eng}, ${esp}, ${chn}, ${fallback}`)
})

```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `locale` | `string` | `undefined` |
| `lookup` | `string` | `undefined` |
| `template` | `Object` | `{}` |
| `fallback` | `string` | `""` |

#### Returns

`any`

#### Defined in

[lib/bot.ts:1061](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1061)

___

### trigger

▸ **trigger**(`text`, `msg`): `Promise`<`any`\>

Trigger handler matching as if entered by the user

This will not trigger .every or .noMatch handlers

**Note:** The ```msg``` parameter of matched handler function will refer to the original message

## Example

```ts

import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('__REPLACE__ME__');

// 2) Export your bot
export default CultureBot;

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
| `text` | `string` |
| `msg` | `RootTrigger`<`AA_Details`\> \| `RootTrigger`<`Message_Details`\> & { `text`: `string`  } \| `RootTrigger`<`File_Details`\> & { `text?`: `string`  } |

#### Returns

`Promise`<`any`\>

#### Defined in

[lib/bot.ts:932](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L932)

___

### warningCard

▸ **warningCard**(`payload?`): [`SpeedyCard`](SpeedyCard.md)

Returns an instance of a SuccessCard. SuccessCards have blue skylike background:

![cards](../media/colored_cards.gif)

```ts
import { Speedybot } from 'speedybot-mini'
// 1) Initialize your bot w/ config
const CultureBot = new Speedybot('tokenPlaceholder');

// 2) Export your bot
export default CultureBot;

// 3) Do whatever you want!

CultureBot.contains(["hi", "hey"],
 async ($bot, msg) => {
   const warning = $bot.successCard({
    title: '⚠️Warning-- you should consider carefully if you want to do that!⚠️',
    subTitle: 'There is a very important reason to slow down and consider if you want to do that...or not',
    chips: ['ping', 'pong'],
   })
    $bot.send(warning)
 })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Partial`<`AbbreviatedSpeedyCard`\> | (title, subtitle, etc) |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

SpeedyCard

#### Defined in

[lib/bot.ts:1425](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L1425)
