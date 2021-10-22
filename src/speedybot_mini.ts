// TODO: Get ridda this, use fetch
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import { placeholder } from './index'


/**
* Minimal config to get up and running. If you need a token...
* Create new bot: https://developer.webex.com/my-apps/new/bot
* Get an existing bot's token (tap "regenerate"): https://developer.webex.com/my-apps
* 
*/
export class SpeedybotMini {
    private axiosInst: AxiosInstance;
    public BotIdentifier = '';
    public handlerList:MinibotHandler[] = []
    public submitHandler: SubmitHandler | null = null

   // Chat/framework handler mappings
    Magickeywords = {
        '<@help>': 'help',
        '<@catchall>': /(.*?)/,
        '<@healthcheck>': 'healthcheck',
        '<@submit>': 'attachmentAction',
    }

    API = {
        getMessageDetails: 'https://webexapis.com/v1/messages',
        getAttachmentDetails: 'https://webexapis.com/v1/attachment/actions',
        getPersonDetails: 'https://webexapis.com/v1/people',
        sendMessage: 'https://webexapis.com/v1/messages', 
        createWebhook: 'https://webexapis.com/v1/webhooks',
        deleteWebhook: `https://webexapis.com/v1/webhooks`,
        getWebhooks: 'https://webexapis.com/v1/webhooks',
        getSelf: 'https://webexapis.com/v1/people/me'
    }

    constructor(token) {
        if (token === placeholder) {
            const error = `ERROR: Placeholder token detected, you need to set a valid Bot Access token. 

If you need a token, see here: https://developer.webex.com/my-apps/new/bot

`
            throw new Error(error)
        }
        this.axiosInst = axios.create({
           headers: {'Authorization': `Bearer ${token}`}
        });

        this.getSelf().then(({data}) => {
            const {id} = data
            this.BotIdentifier = id
        })
    }

    public async getSelf(): Promise<{data: PersonData}> {
        return this.axiosInst.get(this.API.getSelf)
    }

    public send(payload: SendMessage) {
        return this.axiosInst.post(this.API.sendMessage, payload)
    }

    public async sendCard(payload: SendMessage, cardJSON: any) {
        const base = {
            ...payload,
            attachments: [{
                contentType: "application/vnd.microsoft.card.adaptive",
                content: cardJSON}]
        }
        return this.axiosInst.post(this.API.sendMessage, base)
    }

    public sendCardToRoom(roomId, cardPayload: any, fallbackText= 'Your client does not appear to support rendering adaptive cards') {
        const card = {
            roomId,
            markdown: fallbackText,
            attachments: [{
                contentType: "application/vnd.microsoft.card.adaptive",
                content: cardPayload}]
        }
        return this.send(card)
    }

    public sendCardToPerson(email, cardPayload: any, fallbackText= 'Your client does not appear to support rendering adaptive cards') {
        const card = {
            toPersonEmail: email,
            markdown: fallbackText,
            attachments: [{
                contentType: "application/vnd.microsoft.card.adaptive",
                content: cardPayload}]
        }
        return card   
    }

    public async getWebhooks(): Promise<{data: ListWebhookResponse}> {
        return this.axiosInst.get(this.API.getWebhooks)
    }

    public async createWebhook(payload:WebhookConfig): Promise<{data: Webhook}> {
        return this.axiosInst.post(this.API.createWebhook, payload)
    }

    public async createFirehose(url: string, secret?: string) {
        const payload = {
            resource: 'all',
            event: 'all',
            targetUrl: url,
            name: `${new Date().toISOString()}_firehose`
        }

        if (secret) {
            payload['secret'] = secret
        }
        return this.createWebhook(payload)
    }

    public async createAttachmentActionsWebhook(url: string) {
        let payload = {
            resource: 'attachmentActions',
            event: 'created',
            targetUrl: url,
            name: `${new Date().toISOString()}_attachmentActions`
          }
          return this.createWebhook(payload)
    }

    public async deleteWebhook(id: string): Promise<string> {
        const url = `${this.API.deleteWebhook}/${id}`
        return this.axiosInst.delete(url)
    }

    public async killAllWebhooks (hooks: Webhook[]) {
        const killChain: Promise<string>[] = []
        hooks.forEach(item => {
             killChain.push(this.deleteWebhook(item.id))
         })
         return Promise.all(killChain)
     }

     public async killWebhooksByUrl(url: string) {
         const webhooks = await this.getWebhooks()
         const list = webhooks.data.items.filter(({targetUrl}) => targetUrl === url)
         this.killAllWebhooks(list)
     }

    public async getMessageDetails(id: string): Promise<{ data: MessageDetails }> {
        const url = `${this.API.getMessageDetails}/${id}`
        return this.axiosInst.get(url)
    }

    public async getPersonDetails(id: string): Promise<{data: PersonData}> {
        const url = `${this.API.getPersonDetails}/${id}`
        return this.axiosInst.get(url)   
    }

    public async getAttachmentDetails(id: string): Promise<{data: AADetails}> {
        const url = `${this.API.getAttachmentDetails}/${id}`
        return this.axiosInst.get(url)
    }

    public async processIncoming(envelope: MessageEnvelope | AAEnvelope): Promise<{ data: MessageDetails } | {data: AADetails} | null>{
        const {resource, data } = envelope
        const {id, personId} = data
        if (personId !== this.BotIdentifier) {
            if (id && resource === 'messages') {
                return await this.getMessageDetails(id)
            } else if (id && resource === 'attachmentActions') {
                return await this.getAttachmentDetails(id)
            } else {
                return null
            }
        } else {
            return null
        }
    }

    setSubmit(submitHandler: SubmitHandler) {
        this.submitHandler = submitHandler
    }

    /**
     * Helper to register firehose & attachmentActions webhooks
     * @param url 
     * 
     * @param secret 
     * @returns 
     */
    public async Setup(url: string, secret?: string): Promise<[{ data: Webhook; }, { data: Webhook; }]> {
        // Get person info on bot, get its id
        return Promise.all([
            this.createFirehose(url, secret),
            this.createAttachmentActionsWebhook(url)
        ])
    }


    // Broken out since this is a one-off
    public async buildAAtrigger(enrichedTrigger: AADetails) {
        const triggerPayload = {} as (AATrigger)
        triggerPayload.id = enrichedTrigger.id as string
        triggerPayload.attachmentAction = enrichedTrigger
        const { personId } = enrichedTrigger
        const personData = await this.getPersonDetails(personId as string)
        triggerPayload.person = personData.data
        triggerPayload.personId = personData.data.id
        return triggerPayload
    }
    /**
     * Achieve parity with trigger/expected paylaod for handler functions
     * 100% inspired from https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/framework.js#L632
     * Add some fairy dust to handle @bot-mentions
     **/
    public async buildTrigger(enrichedTrigger: MessageDetails): Promise<MessageTrigger> {
        const triggerPayload = {} as (MessageTrigger)
        triggerPayload.type = 'message';

            const message = enrichedTrigger as MessageDetails
            triggerPayload.id = message.id as string
            triggerPayload.message = message

            if (message.text) {
                Object.assign(triggerPayload, {text:message.text.trim()})
            }

            const args = message.text ? message.text.split(' ') : [];
            Object.assign(triggerPayload, {args})

            if (message.roomType === 'group' && triggerPayload['args'].length) {
                // In group rooms, return text includes bot @mention
                // if a group, slice off 1st element
                // Ain't pretty or elegant, but resolving this "here" is a big win
                // Another approach: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/framework.js#L1193-L1194
                const args = triggerPayload['args'].slice(1)
                Object.assign(triggerPayload, {args})
                Object.assign(triggerPayload, {text: args.join(' ')})

                // Adjust original message too
                // triggerPayload.message.html will contain the rich markup for a mention
                //@ts-ignore
                triggerPayload.message.text = triggerPayload.text
            }

        // Annotate with person details
        const { personId } = enrichedTrigger
        const personData = await this.getPersonDetails(personId as string)
        triggerPayload.person = personData.data
        triggerPayload.personId = personData.data.id
    
        return triggerPayload
    }

    addHandler(handler:MinibotHandler) {
        this.handlerList.push(handler)
    }

    addHandlers(handlers: MinibotHandler[]) {
        handlers.forEach(botHandler => { 
            const { keyword, } = botHandler
            let triggerPhrase = keyword
            if (triggerPhrase instanceof Array) {
                triggerPhrase.forEach((alias) => {
                    const newHandler = {
                        ...botHandler,
                        keyword: alias
                    }
                    this.addHandler(newHandler)
                })
            this.addHandler(botHandler)
            }
        })
    }

    public invokeHandler(handler, trigger: MessageTrigger) {
        const bot = new Bot<MessageTrigger>(this, trigger)
        handler(bot, trigger)
    }

    public async handleWebhook(payload: (MessageEnvelope | AAEnvelope)) {
        const isAttachmentActions = payload.resource === 'attachmentActions'
        // const triggerType = isAttachmentActions ? 'attachmentActions' : 'message'

        if (isAttachmentActions && this.submitHandler) {
            if (this.submitHandler) {
                const decoratedMessage = await this.processIncoming(payload) as {data: AADetails}
                const trigger = await this.buildAAtrigger(decoratedMessage.data)
                const { handler } = this.submitHandler as SubmitHandler
                const botRef = new Bot<AATrigger>(this, trigger)
                handler(botRef, trigger)
            }
        } else {
            if (payload.data.personId !== this.BotIdentifier) {
                const decoratedMessage = await this.processIncoming(payload) as {data: MessageDetails}
                const trigger = await this.buildTrigger(decoratedMessage.data)
                this.findAndInvokeHandlers(trigger)
            }
        }
    }

    public findHandler(target: string) {
        const matchedHandlers = this.handlerList.filter(({keyword}) => keyword === target )
        return matchedHandlers
    }

    public findAndInvokeHandlers(trigger: MessageTrigger) {
        const matchedHandlers = this.handlerList.filter(lex => {
            if (lex.keyword instanceof RegExp && lex.keyword.test(trigger.text as string)) {
                trigger.phrase = lex.keyword
                return true;
            }
        
            if (typeof lex.keyword === 'string') {
                const { args } = trigger
                const [triggerCandidate] = args as string[]
                if (lex.keyword === triggerCandidate) {
                    trigger.phrase = lex.keyword;
                    return true
                }
            }
        })
        const bot = new Bot(this, trigger)
        matchedHandlers.forEach(match => {
            const { handler } = match
            handler(bot, trigger)
        })
    }

    public getItem() {

    }
}


export class Bot<T> {
    constructor(public SpeedybotMini: SpeedybotMini, public trigger: T) {}
    say(utterance) {
        //@ts-ignore
        const roomId = this.trigger.message ? this.trigger.message.roomId : this.trigger.attachmentAction.roomId
        const payload:SendMessage = {
            roomId,
            markdown: utterance,
            text: utterance
        }
        return this.SpeedybotMini.send(payload)
    }
    sendCard(cardJson: any, fallbackText='Sorry, it appears your client does not support rendering Adpative Cards') {
        //@ts-ignore
        const roomId = this.trigger.message ? this.trigger.message.roomId : this.trigger.attachmentAction.roomId
        const payload:SendMessage = {
            roomId,
            text: fallbackText
        }
        return this.SpeedybotMini.sendCard(payload, cardJson)
    }
    axios(config: AxiosRequestConfig={}) {
        return axios(config);
    }
    get<T = any>(route: string, config: AxiosRequestConfig = {}): Promise<{data: T}> {
        return axios.get(route, config);
    }
    post<T = any>(route: string, config: AxiosRequestConfig = {}): Promise<{data: T}> {
        return axios.post(route, config);
    }
}


export const SpeedyLambda = (token: string, handlers: (MinibotHandler | SubmitHandler)[]) => {
    const inst = new SpeedybotMini(token)

    const noSubmit = handlers.filter((handler) => {
        const {keyword} = handler
        if (keyword === '<@submit>') {
             inst.setSubmit(handler as SubmitHandler)
            return false
        } else {
            return true
        }
    }) as MinibotHandler[]

    inst.addHandlers(noSubmit)
    return async function(eventPayload) {
        return inst.handleWebhook(eventPayload)       
    }
}
export const SpeedyBotLambda =(token: string, handlers: MinibotHandler[]) => {
    return SpeedyLambda(token, handlers)
}

export interface WebhookConfig {
    name: string;
    targetUrl: string;
    resource?: string; // 'all',
    event?: string; // 'all',
    secret?: string;
}


export type keywords = string | RegExp;
export type Allowedkeywords = keywords | keywords[];

export type MessageBotInst = Bot<MessageTrigger>
export type handlerFunc = (bot: Bot<MessageTrigger>, trigger: MessageTrigger) => void;
export interface MinibotHandler {
    keyword: Allowedkeywords; // string or regex, or a list of both. If regex it matches on entire message, if a string just on the 1st word
	handler: handlerFunc;
	helpText?: string; // Used by built-in help generator any handlers you write this way will list out their help data
}

export type SubmitBotInst = Bot<AATrigger>
export type SubmitHandlerFunc = (bot: SubmitBotInst, trigger: AATrigger) => void;
export interface SubmitHandler {
    keyword: Allowedkeywords; // string or regex, or a list of both. If regex it matches on entire message, if a string just on the 1st word
	handler: SubmitHandlerFunc;
	helpText?: string; // Used by built-in help generator any handlers you write this way will list out their help data
}

export interface MinibotInst {
    say(msg: string): Promise<MessageDetails>;
    sendCard(payload: any, fallbackText: string);

}

export interface SendMessage {
    roomId?: string;
    toPersonEmail?:string;
    toPersonId?: string;
    markdown?: string;
    text?: string; // optional fallback if no markdown
    files?: string[];
    attachments?: any[]; // TODO: type-me
    parentId?: string; // for replies
}


// Webhooks List
export interface Webhook {
    id: string;
    name: string;
    targetUrl: string;
    resource: string;
    event: string;
    orgId: string;
    createdBy: string;
    appId: string;
    ownedBy: string;
    status: string;
    created: Date;
}

export interface ListWebhookResponse {
    items: Webhook[];
}

//
export interface EnvelopeBase {
    id: string;
    name: string;
    targetUrl: string;
    resource: string;
    event: string;
    orgId: string;
    createdBy: string;
    appId: string;
    ownedBy: string;
    status: string;
    created: Date | string;
    actorId: string;
}

// "Messages"
export interface MessageEnvelope extends EnvelopeBase {
    data: MessageEnvelopeData;
}

export interface MessageEnvelopeData {
    id: string;
    roomId: string;
    roomType: string;
    personId: string;
    personEmail: string;
    created: Date | string;
}

// encrypted message details
export interface MessageDetails extends Partial<MessageEnvelopeData> {
    text: string;
    markdown?: string;
    html?: string;
}

// "AttachmentActions" (attachmentAction)
export interface AAEnvelope extends EnvelopeBase {
    data: AAEnvelopeData;
}

export interface AAEnvelopeData {
    id: string;
    type: string; // 'submit'
    messageId: string;
    personId: string;
    roomId: string;
    created: Date | string;
}

export interface AADetails {
    id: string;
    type: string;
    messageId: string;
    inputs: any;
    personId: string;
    roomId: string;
    created: Date | string;
}

export interface PersonData {
    id: string;
    emails: string[];
    phoneNumbers: any[];
    displayName: string;
    nickName: string;
    firstName: string;
    lastName: string;
    orgId: string;
    created: Date | string;
    lastModified: Date | string;
    timeZone: string;
    lastActivity: Date | string;
    status: string;
    type: string;
}

export type TriggerTypes = 'message' | 'attachmentAction' | 'attachmentActions'
export interface TriggerBase {
    type: string;
    id: string;
    person: PersonData;
    personId: string;
    phrase?:string | RegExp
}
export interface MessageTrigger extends TriggerBase{
  message: MessageDetails;
  text: string;
  args: string[];
}

export interface AATrigger extends TriggerBase{
  attachmentAction: AADetails;
}

// need better way to segment handlers between AA & message
// don't want AA handler to be able to access message data, vice-versa
// export interface BotTrigger extends TriggerBase {
//     message?: MessageDetails;
//     text?: string;
//     args?: string[];
//     attachmentAction?: AADetails;
// }

// export interface BotDetails {
//     id: string;
//     type: string;
//     messageId: string;
//     inputs: any;
//     personId: string;
//     roomId: string;
//     created: Date | string;
//     text: string;
//     markdown?: string;
//     html?: string;
// }