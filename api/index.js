const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const auth = require('./auth')
const session = require('express-session');

const server = express()

const sessionConfig = {
    name: 'webauth-1',
    secret: "here's the secret.",
    cookie: {
        httpOnly: true,
        maxAge: 60000 * 60,
        secure: false
    },
    resave: false,
    saveUninitialized: true
}

server.use(session(sessionConfig))
server.use(express.json())
server.use(morgan('dev'))
server.use(helmet())

server.get('/', (req, res) => {
    res.status(400).send('This is not the endpoint you are looking for.')
})

server.get('/api', (req, res) => {
    res.status(400).send('This is not the endpoint you are looking for.')
})

server.use('/api', auth)

module.exports = server
