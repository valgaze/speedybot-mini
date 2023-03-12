[speedybot-mini](README.md) / Exports

# speedybot-mini

## Table of contents

### Classes

- [BotInst](classes/BotInst.md)
- [SpeedyCard](classes/SpeedyCard.md)
- [Speedybot](classes/Speedybot.md)

### Type Aliases

- [BotConfig](modules.md#botconfig)

## Type Aliases

### BotConfig

Ƭ **BotConfig**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SpeedybotInst` | [`Speedybot`](classes/Speedybot.md) |
| `env?` | `T` |
| `fallbackText?` | `string` |
| `locales?` | { `[localeName: string]`: { `[key: string]`: `any`;  };  } |
| `roomId` | `string` |
| `token` | `string` |
| `url?` | `string` |

#### Defined in

[lib/bot.ts:27](https://github.com/valgaze/speedybot-mini/blob/ea4b11b/src/lib/bot.ts#L27)
