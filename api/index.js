const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const auth = require('./auth')

const server = express()

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
