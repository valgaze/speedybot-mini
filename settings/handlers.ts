import Namegamehandler from './namegame'

import { pickRandom, SpeedyCard } from '../src'
import { MinibotHandler, MessageTrigger, SubmitHandler, AATrigger, MessageBotInst, SubmitBotInst} from '../src'
/**
 * Add a "handler" below to control your bot's responses to a user-- just add to the list
 * 
 * At minimum a handler must have
 * keyword: a word, RegEx, or a list of words and/or regex's to trigger the handler
 * handler: a function with access to the bot instance and "trigger" data 
 * helpText: Simple explanation for how to use (this gets displayed by default if the user tells your bot "help")
 * 
 * If you can make it fit in this list, you can make it do whatever you want
 * Special keyword phrases:
 * 1) "<@submit>": will be triggered whenever the user subits data from a form
 * 
 */
const handlers: (MinibotHandler | SubmitHandler)[] = [
	{
		keyword: ['hello', 'hey', 'hi'],
		handler(bot:MessageBotInst, trigger: MessageTrigger) {
			const reply = `Heya how's it going ${trigger.person.displayName}?`
			bot.say(reply)
		}
	},
	{
		keyword: ['ping', 'pong'],
		handler(bot:MessageBotInst, trigger: MessageTrigger) {
			const normalized = trigger.text.toLowerCase()
			if (normalized === 'ping') {
				bot.say('pong')
			} else {
				bot.say('ping')
			}
		},
		helpText: `A handler that says ping when the user says pong and vice versa`
	},
	{
		keyword: ['joke', 'dadjoke',],
		async handler(bot:MessageBotInst, trigger: MessageTrigger) {
			interface DadJokeResponse {
				id: string;
				joke: string;
				status: number
			}
			const res = await bot.get<DadJokeResponse>('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
			const { joke } = res.data
			bot.say(`Here's a joke: ${joke}`)
		},
		helpText: `A handler that tells a joke from the joke-api v2`
	},
	{
		keyword: ['healthcheck', 'health'],
		handler(bot:MessageBotInst, trigger: MessageTrigger) {
			const choices = [`At the tone, the time will be ${new Date}`, `${new Date}, healthcheck is GOOD`, `Health Status: Good (${new Date()})`]
			bot.say(pickRandom(choices))
	
			// Adapative Card: https://developer.webex.com/docs/api/guides/cards
			const cardPayload = new SpeedyCard().setTitle('System is 👍')
											.setSubtitle('If you see this card, everything is working')
											.setImage('https://i.imgur.com/SW78JRd.jpg')
											.setInput(`What's on your mind?`)
											.setUrl(pickRandom(['https://www.youtube.com/watch?v=3GwjfUFyY6M', 'https://www.youtube.com/watch?v=d-diB65scQU']), 'Take a moment to celebrate')
											.setTable([[`Bot's Date`, new Date().toDateString()], ["Bot's Uptime", `${String(process.uptime()).substring(0, 25)}s`]])

			bot.sendCard(cardPayload.render())
		},
		helpText: `A special handler that fires anytime a user submits data (you can only trigger this handler by tapping Submit in a card)`
	},
	{
		keyword: '<@submit>',
		handler(bot:SubmitBotInst, trigger:AATrigger) {
			// Ex. From here data could be transmitted to another service or a 3rd-party integrationn
			bot.say(`Submission received! You sent us ${JSON.stringify(trigger.attachmentAction.inputs)}`)
		},
		helpText: `A special handler that fires anytime a user submits data (you can only trigger this handler by tapping Submit in a card)`
	},
	Namegamehandler, // Can also import
]

export default handlers;