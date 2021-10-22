/**
* @param list 
* Pick an item from the list
**/
export const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]


/**
 *
 * Randomly selects a phrase & fill in template
 *
 * ```ts
 *
 * // ie from an external template file
 * const payload = {
 *  phrases: ['Hey there, how it going, $[name]?', 'Hi $[name], here's your $[mint]']
 *  template: {
 * 		name: 'Joe',
 *  	flavor: 'mint'
 *  }
 * }
 *
 * fillTemplate(payload.phrases, payload.template)
 *
 * ```
 *
 * @param phrases: array of phrases []string
 * ```ts
 *  ['Howdy, you are $[name] and you like $[flavor]', '$[name], here is $[flavor]']
 * ```
 * @param template: mappings to phrases object
 *
 * ```js
 * {
 *   name: 'Joe',
 *   flavor: 'mint'
 * }
 *```
 *
 *
 */

 export const fillTemplate = (utterances: string | string[], template:  { [key: string]: any }): string => {
	let payload: string;
	if (typeof utterances != "string") {
		payload = pickRandom(utterances) || "";
	} else {
		payload = utterances
	}
	const replacer = (
		utterance: string,
		target: string,
		replacement: string
	): string => {
		if (!utterance.includes(`$[${target}]`)) {
			return utterance
		} else {
			return replacer(
				utterance.replace(`$[${target}]`, replacement),
				target,
				replacement
			)
		}
	}

	for (let key in template) {
		const val = template[key]
		payload = replacer(payload, key, val)
	}
	return payload
}

export interface PLACEHOLDER {
	[key: string]: any;
}

export class Locker<T> {
	constructor(public state: T = {} as T) {}

	save(trigger:PLACEHOLDER, key: string, value: unknown) {
		const { personId } = trigger
		if (!this.state[personId]) {
			this.state[personId] = {}
		}
		this.state[personId][key] = value
	}

	get(trigger:PLACEHOLDER, key: string) {
		const { personId } = trigger
		return this.state[personId] ? (this.state[personId][key] || null) : null
	}

	delete(trigger: PLACEHOLDER, key: string) {
		const { personId } = trigger
		if (this.state[personId]) {
			delete this.state[personId][key]
		}
	}

	snapShot() {
		return JSON.parse(JSON.stringify(this.state))
	}
}