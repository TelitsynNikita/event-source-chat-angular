require('dotenv').config()
const express = require('express')
const app = express()
const events = require('events')
const PORT = process.env.PORT || 6000
const emitter = new events.EventEmitter()

app.use(require('cors')())
app.use(express.json())

app.get('/get-messages', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    })
    emitter.on('newMessage', (message) => {
        res.write(message)
    })
})

app.post('/new-messages', (req, res) => {
    const message = req.body
    emitter.emit('newMessage', message)
    res.status(200)
})

app.listen(PORT, () => {
    console.log('Server started')
})