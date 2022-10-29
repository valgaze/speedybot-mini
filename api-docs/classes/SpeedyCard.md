[speedybot-mini](../README.md) / [Exports](../modules.md) / SpeedyCard

# Class: SpeedyCard

## Table of contents

### Constructors

- [constructor](SpeedyCard.md#constructor)

### Properties

- [attachedData](SpeedyCard.md#attacheddata)
- [backgroundImage](SpeedyCard.md#backgroundimage)
- [buttonLabel](SpeedyCard.md#buttonlabel)
- [choiceConfig](SpeedyCard.md#choiceconfig)
- [choices](SpeedyCard.md#choices)
- [dateData](SpeedyCard.md#datedata)
- [details](SpeedyCard.md#details)
- [image](SpeedyCard.md#image)
- [imageConfig](SpeedyCard.md#imageconfig)
- [inputConfig](SpeedyCard.md#inputconfig)
- [inputPlaceholder](SpeedyCard.md#inputplaceholder)
- [json](SpeedyCard.md#json)
- [needsSubmit](SpeedyCard.md#needssubmit)
- [subTitleConfig](SpeedyCard.md#subtitleconfig)
- [subtitle](SpeedyCard.md#subtitle)
- [tableData](SpeedyCard.md#tabledata)
- [texts](SpeedyCard.md#texts)
- [timeData](SpeedyCard.md#timedata)
- [title](SpeedyCard.md#title)
- [titleConfig](SpeedyCard.md#titleconfig)
- [url](SpeedyCard.md#url)
- [urlLabel](SpeedyCard.md#urllabel)

### Methods

- [addAction](SpeedyCard.md#addaction)
- [addChip](SpeedyCard.md#addchip)
- [card](SpeedyCard.md#card)
- [render](SpeedyCard.md#render)
- [renderFull](SpeedyCard.md#renderfull)
- [setBackgroundImage](SpeedyCard.md#setbackgroundimage)
- [setButtonLabel](SpeedyCard.md#setbuttonlabel)
- [setChips](SpeedyCard.md#setchips)
- [setChoices](SpeedyCard.md#setchoices)
- [setData](SpeedyCard.md#setdata)
- [setDate](SpeedyCard.md#setdate)
- [setDetail](SpeedyCard.md#setdetail)
- [setImage](SpeedyCard.md#setimage)
- [setInput](SpeedyCard.md#setinput)
- [setSubtitle](SpeedyCard.md#setsubtitle)
- [setTable](SpeedyCard.md#settable)
- [setText](SpeedyCard.md#settext)
- [setTime](SpeedyCard.md#settime)
- [setTitle](SpeedyCard.md#settitle)
- [setUrl](SpeedyCard.md#seturl)
- [setUrlLabel](SpeedyCard.md#seturllabel)

## Constructors

### constructor

• **new SpeedyCard**()

#### Defined in

[lib/cards.ts:156](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L156)

## Properties

### attachedData

• **attachedData**: `AttachmentData` = `{}`

#### Defined in

[lib/cards.ts:131](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L131)

___

### backgroundImage

• **backgroundImage**: `string` = `""`

#### Defined in

[lib/cards.ts:135](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L135)

___

### buttonLabel

• **buttonLabel**: `string` = `"Submit"`

#### Defined in

[lib/cards.ts:123](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L123)

___

### choiceConfig

• **choiceConfig**: `Partial`<`ChoiceBlock`\> = `{}`

#### Defined in

[lib/cards.ts:120](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L120)

___

### choices

• **choices**: `ChoiceOption`[] = `[]`

#### Defined in

[lib/cards.ts:119](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L119)

___

### dateData

• **dateData**: `Partial`<`SelectorPayload`\> = `{}`

#### Defined in

[lib/cards.ts:133](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L133)

___

### details

• **details**: { `card`: `any` ; `title`: `string` ; `type`: `string`  }[] = `[]`

#### Defined in

[lib/cards.ts:142](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L142)

___

### image

• **image**: `string` = `""`

#### Defined in

[lib/cards.ts:121](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L121)

___

### imageConfig

• **imageConfig**: `BaseOpts` = `{}`

#### Defined in

[lib/cards.ts:122](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L122)

___

### inputConfig

• **inputConfig**: `inputConfig`

#### Defined in

[lib/cards.ts:125](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L125)

___

### inputPlaceholder

• **inputPlaceholder**: `string` = `""`

#### Defined in

[lib/cards.ts:124](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L124)

___

### json

• **json**: `EasyCardSpec`

#### Defined in

[lib/cards.ts:149](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L149)

___

### needsSubmit

• **needsSubmit**: `boolean` = `false`

#### Defined in

[lib/cards.ts:132](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L132)

___

### subTitleConfig

• **subTitleConfig**: `Partial`<`TextBlock`\> = `{}`

#### Defined in

[lib/cards.ts:118](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L118)

___

### subtitle

• **subtitle**: `string` = `""`

#### Defined in

[lib/cards.ts:116](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L116)

___

### tableData

• **tableData**: `string`[][] = `[]`

#### Defined in

[lib/cards.ts:130](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L130)

___

### texts

• **texts**: { `horizontalAlignment?`: `string` ; `size?`: `string` ; `text?`: `string` ; `type?`: `string`  }[] = `[]`

#### Defined in

[lib/cards.ts:136](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L136)

___

### timeData

• **timeData**: `Partial`<`SelectorPayload`\> = `{}`

#### Defined in

[lib/cards.ts:134](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L134)

___

### title

• **title**: `string` = `""`

#### Defined in

[lib/cards.ts:115](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L115)

___

### titleConfig

• **titleConfig**: `Partial`<`TextBlock`\> = `{}`

#### Defined in

[lib/cards.ts:117](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L117)

___

### url

• **url**: `string` = `""`

#### Defined in

[lib/cards.ts:128](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L128)

___

### urlLabel

• **urlLabel**: `string` = `"Go"`

#### Defined in

[lib/cards.ts:129](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L129)

## Methods

### addAction

▸ **addAction**(`payload`, `label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `string` |
| `label` | `string` |

#### Returns

`void`

#### Defined in

[lib/cards.ts:319](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L319)

___

### addChip

▸ **addChip**(`payload`, `submitLabel?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | `string` \| { `keyword?`: `string` ; `label`: `string`  } | `undefined` |
| `submitLabel` | `string` | `"chip_action"` |

#### Returns

`void`

#### Defined in

[lib/cards.ts:312](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L312)

___

### card

▸ **card**(`config?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<`AbbreviatedSpeedyCard`\> |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:533](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L533)

___

### render

▸ **render**(): `EasyCardSpec`

#### Returns

`EasyCardSpec`

#### Defined in

[lib/cards.ts:364](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L364)

___

### renderFull

▸ **renderFull**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `attachments` | `EasyCardSpec`[] |
| `markdown` | `string` |
| `roomId` | `string` |

#### Defined in

[lib/cards.ts:595](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L595)

___

### setBackgroundImage

▸ **setBackgroundImage**(`url`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:175](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L175)

___

### setButtonLabel

▸ **setButtonLabel**(`label`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:216](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L216)

___

### setChips

▸ **setChips**(`chips`, `submitLabel?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chips` | (`string` \| { `keyword?`: `string` ; `label`: `string`  })[] | `undefined` |
| `submitLabel` | `string` | `"chip_action"` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:329](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L329)

___

### setChoices

▸ **setChoices**(`choices`, `config?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `choices` | (`string` \| `number`)[] |
| `config?` | `ChoiceBlock` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:195](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L195)

___

### setData

▸ **setData**(`payload`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `AttachmentData` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:249](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L249)

___

### setDate

▸ **setDate**(`id?`, `label?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `"selectedDate"` |
| `label` | `string` | `""` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:257](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L257)

___

### setDetail

▸ **setDetail**(`payload`, `label?`): [`SpeedyCard`](SpeedyCard.md)

Add a card into a card

Kinda like Action.Showcard: https://adaptivecards.io/explorer/Action.ShowCard.html

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`SpeedyCard`](SpeedyCard.md) \| `Partial`<`AbbreviatedSpeedyCard` & { `label?`: `string`  }\> | (another SpeedyCard) |
| `label?` | `string` |  |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:288](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L288)

___

### setImage

▸ **setImage**(`url`, `imageConfig?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `imageConfig?` | `any` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:208](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L208)

___

### setInput

▸ **setInput**(`placeholder`, `config?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholder` | `string` |
| `config?` | `inputConfig` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:221](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L221)

___

### setSubtitle

▸ **setSubtitle**(`subtitle`, `config?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `subtitle` | `string` |
| `config?` | `Partial`<`TextBlock`\> |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:187](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L187)

___

### setTable

▸ **setTable**(`input`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | { `[key: string]`: `string`;  } \| (`string` \| `number`)[][] |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:240](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L240)

___

### setText

▸ **setText**(`text`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` \| `string`[] |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:158](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L158)

___

### setTime

▸ **setTime**(`id?`, `label?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `"selectedTime"` |
| `label` | `string` | `"Select a time"` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:267](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L267)

___

### setTitle

▸ **setTitle**(`title`, `config?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `config?` | `Partial`<`TextBlock`\> |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:179](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L179)

___

### setUrl

▸ **setUrl**(`url`, `label?`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `label` | `string` | `"Go"` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:229](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L229)

___

### setUrlLabel

▸ **setUrlLabel**(`label`): [`SpeedyCard`](SpeedyCard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

[`SpeedyCard`](SpeedyCard.md)

#### Defined in

[lib/cards.ts:235](https://github.com/valgaze/speedybot-mini/blob/5859691/src/lib/cards.ts#L235)
