[speedybot-mini](../README.md) / [Exports](../modules.md) / Speedybot

# Class: Speedybot

## Table of contents

### Constructors

- [constructor](Speedybot.md#constructor)

### Properties

- [FileHandler](Speedybot.md#filehandler)
- [\_config](Speedybot.md#_config)
- [handlers](Speedybot.md#handlers)
- [rootList](Speedybot.md#rootlist)

### Methods

- [IncomingWebhooks](Speedybot.md#incomingwebhooks)
- [actionHandler](Speedybot.md#actionhandler)
- [buildDetails](Speedybot.md#builddetails)
- [checkStrings](Speedybot.md#checkstrings)
- [contains](Speedybot.md#contains)
- [deleteMessage](Speedybot.md#deletemessage)
- [detectType](Speedybot.md#detecttype)
- [every](Speedybot.md#every)
- [exact](Speedybot.md#exact)
- [exposeToken](Speedybot.md#exposetoken)
- [getAuthor](Speedybot.md#getauthor)
- [getData](Speedybot.md#getdata)
- [getSelf](Speedybot.md#getself)
- [getToken](Speedybot.md#gettoken)
- [isEnvelope](Speedybot.md#isenvelope)
- [isHuman](Speedybot.md#ishuman)
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

• **new Speedybot**(`config`, `makeRequest?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | `string` \| `Config` | `undefined` |
| `makeRequest` | `CoreMakerequest`<`any`\> | `RequesterFunc` |

#### Defined in

[lib/speedybot.ts:90](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L90)

## Properties

### FileHandler

• **FileHandler**: ``null`` \| `FileHandlerFunc`<`any`\> = `null`

#### Defined in

[lib/speedybot.ts:105](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L105)

___

### \_config

• `Private` **\_config**: `Config`

#### Defined in

[lib/speedybot.ts:74](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L74)

___

### handlers

• `Private` **handlers**: `Object`

#### Index signature

▪ [key: `string`]: `HandlerFunc` \| ``null``

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ALL` | ``null`` \| `HandlerFunc`<`any`\> |
| `NO_MATCH` | ``null`` \| `HandlerFunc`<`any`\> |
| `camera` | ``null`` \| `HandlerFunc`<`any`\> |
| `file` | ``null`` \| `HandlerFunc`<`any`\> |
| `submit` | ``null`` \| `HandlerFunc`<`any`\> |

#### Defined in

[lib/speedybot.ts:106](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L106)

___

### rootList

• `Private` **rootList**: `RootList` = `[]`

#### Defined in

[lib/speedybot.ts:104](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L104)

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

[lib/speedybot.ts:72](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L72)

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

[lib/speedybot.ts:452](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L452)

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

[lib/speedybot.ts:474](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L474)

___

### checkStrings

▸ `Private` **checkStrings**(`a`, `incoming`, `exact?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `a` | `string` | `undefined` |
| `incoming` | `string` | `undefined` |
| `exact` | `boolean` | `false` |

#### Returns

`boolean`

#### Defined in

[lib/speedybot.ts:122](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L122)

___

### contains

▸ **contains**(`keyword`, `cb`): `void`

Register a handler that matches on a string or list of strings

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` \| `string`[] |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:136](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L136)

___

### deleteMessage

▸ `Private` **deleteMessage**(`msgId`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[lib/speedybot.ts:462](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L462)

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

[lib/speedybot.ts:240](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L240)

___

### every

▸ **every**(`handler`, `skipList?`): `Object`

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

[lib/speedybot.ts:164](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L164)

___

### exact

▸ **exact**(`keyword`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:149](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L149)

___

### exposeToken

▸ **exposeToken**(): `string`

#### Returns

`string`

#### Defined in

[lib/speedybot.ts:101](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L101)

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

[lib/speedybot.ts:491](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L491)

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

[lib/speedybot.ts:528](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L528)

___

### getSelf

▸ `Private` **getSelf**(): `Promise`<`SelfData`\>

#### Returns

`Promise`<`SelfData`\>

#### Defined in

[lib/speedybot.ts:514](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L514)

___

### getToken

▸ **getToken**(): `string`

#### Returns

`string`

#### Defined in

[lib/speedybot.ts:470](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L470)

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

[lib/speedybot.ts:568](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L568)

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

[lib/speedybot.ts:505](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L505)

___

### noMatch

▸ **noMatch**(`handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:160](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L160)

___

### onCamera

▸ **onCamera**(`handler`): `void`

Camera handler-- will trigger by default for png, jpeg, & jpg

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | `FileHandlerFunc`<`any`\> | ### Example ```ts import { Speedybot } from "speedybot-mini"; // 1) Initialize your bot const CultureBot = new Speedybot("__REPLACE__MEE__"); // 2) Export your bot export default CultureBot;  // Add a camera handler CultureBot.onCamera(($bot, msg, fileData) => {    const { fileName, extension, type } = fileData;    $bot.send(`You sent a photo: ${fileName} ${extension} ${type}`);    // file data available under fileData.data }); ``` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:208](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L208)

___

### onFile

▸ **onFile**(`handler`): `Object`

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

[lib/speedybot.ts:215](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L215)

___

### onSubmit

▸ **onSubmit**(`handler`): `Object`

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

[lib/speedybot.ts:230](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L230)

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

[lib/speedybot.ts:562](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L562)

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

[lib/speedybot.ts:258](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L258)

___

### processSubmit

▸ **processSubmit**(`details`): `undefined` \| ``null`` \| `HandlerFunc`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `details` | `AA_Details` |

#### Returns

`undefined` \| ``null`` \| `HandlerFunc`<`any`\>

#### Defined in

[lib/speedybot.ts:374](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L374)

___

### processText

▸ **processText**(`incoming?`): `undefined` \| ``null`` \| `HandlerFunc`<`any`\>

If worst case (user enters text
 and we need to search for it)
Check the list and find a 1-1 match or "contains"

Note: All queries are lower-cased

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `incoming` | `string` | `""` |

#### Returns

`undefined` \| ``null`` \| `HandlerFunc`<`any`\>

#### Defined in

[lib/speedybot.ts:401](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L401)

___

### regex

▸ **regex**(`rx`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rx` | `RegExp` |
| `cb` | `MsgHandler` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:155](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L155)

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

[lib/speedybot.ts:183](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L183)

___

### setHandler

▸ **setHandler**(`handlerType`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handlerType` | `string` |
| `handler` | `any` |

#### Returns

`void`

#### Defined in

[lib/speedybot.ts:212](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L212)

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

[lib/speedybot.ts:466](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/speedybot.ts#L466)
