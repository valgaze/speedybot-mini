// See here: https://www.youtube.com/watch?v=NeF7jqf0GU4
import { pickRandom, MessageTrigger, Bot, SpeedyCard} from './../src'
export default {
	keyword: ['namegame', 'namegame:start'],
	handler(bot: Bot<MessageTrigger>, trigger: MessageTrigger) {
		const [rootCommand, name] = trigger.args;
		if (rootCommand === 'namegame:start') {
			const text = `
			🎶🎶🎸🎶🎶
			Come on ev'rybody, I say now let's play a gamme

			Mention this bot and give it a nammme:

			ex. @botname namegame Shirley

			ex. namegame Lincoln
			🎶🎶🎸🎶🎶
			`

			const myCard = new SpeedyCard().setTitle('The Name Game by Shirley Ellis').setSubtitle(text).setUrl('https://www.youtube.com/watch?v=NeF7jqf0GU4').setImage('https://i3.ytimg.com/vi/NeF7jqf0GU4/hqdefault.jpg')
			return bot.sendCard(myCard.render(), 'It appears your client does not support adaptive cards')
		}

		const firstName = name ? name : trigger.person.firstName;
		const res = lyricsGenerator(firstName)
		const warmup = ['Alright,', 'Here we go', 'Ready?', 'Deep breath...']
		const output = `${pickRandom(warmup)} ${res}`

		const myCard = new SpeedyCard().setTitle('The Name Game by Shirley Ellis').setSubtitle(output).setUrl('https://www.youtube.com/watch?v=NeF7jqf0GU4').setImage('https://i3.ytimg.com/vi/NeF7jqf0GU4/hqdefault.jpg')
		bot.sendCard(myCard.render(), 'The Name Game by Shirley Ellis: https://www.youtube.com/watch?v=NeF7jqf0GU4')
		if (!name) {
			bot.say('Psst, try adding a name, like this: @botname namegame Shirley')
		}
		return;
	},
	helpText: `🎶🎶 Come on everybody, let's play the name game! 🎶🎶 Start a game with 'namegame:start' or enter it directly, ex 'namegame Lincoln'`
}
// https://github.com/valgaze/aws-ecr/blob/master/app/lyrics_generator.js
const isVowel = (letter: string): Boolean => {
	const vowels = {
		'a': true,
		'e': true,
		'i': true,
		'o': true,
		'u': true
	}
	return Boolean(vowels[letter]);
}
const isBFM = (letter: string): Boolean => {
	const vowels = {
		'b': true,
		'f': true,
		'm': true
	}
	return Boolean(vowels[letter]);
}


const cases = (firstLetter, remainder, fullname) => {
	// Vowel case
	if (isVowel(firstLetter)) {

		return `
${fullname}, ${fullname}, bo-${fullname.toLowerCase()}
Banana-fana fo-f${fullname.toLowerCase()}
Fee-fi-mo-m${fullname.toLowerCase()}
${fullname}! 	
`
	}

	// Billy/Felix/Mary case
	if (isBFM(firstLetter)) {
		return `
${fullname}, ${fullname}, bo-${remainder}
Banana-fana fo-${remainder}
Fee-fi-mo-m${remainder}
${fullname}!
`
	}

	return `
${fullname}, ${fullname}, bo-b${remainder}
Banana-fana fo-f${remainder}
Fee-fi-mo-m${remainder}
${fullname}! 	
`
}

export const lyricsGenerator = (name = "Marsha") => {
	const firstLetter = name.charAt(0);
	const remainder = name.slice(1);
	return cases(firstLetter, remainder, name);
};
