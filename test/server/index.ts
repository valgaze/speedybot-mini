import { MinibotHandler, SubmitHandler, SpeedyLambda } from './../../src/'
import handlers from './../../settings/handlers'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT || 8000
app.use(bodyParser.json());
app.post('/ping', (req, res) => res.send('pong!'))
import { token } from './../../settings/config.json'


const handler = SpeedyLambda(token, handlers as (MinibotHandler | SubmitHandler)[])
app.post('/speedyminiwebhook', async (req, res) => {
    console.log("##", req.body)
    if (req.body) {
        handler(req.body)
    }
})

app.listen(port, () => {
    console.log(`Listening + tunneled on port ${port}`)
})