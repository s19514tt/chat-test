import express from 'express'

const app = express()

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://54.168.233.46:8080',
    methods: ['*'],
  },
})

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('msg', msg)
  })
})
server.listen(3000)
