const express = require('express')
const app = express()
const port = 3000
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

// стартовое состояние
let status = [false, true, false]
let message = 'Welcome!'
let clients = {
    counter: 0,
    list: []
}
const limit = 2

let game = {
    field: []
}

function startGame() {
    for (var i = 0; i < 9; i++) {
        game.field.push({})
    }
}

startGame()

io.on('connection', function(socket) {

    if (clients.counter >= limit) {

        // отказываем, если нет мест
        io.to(socket.id).emit('closeReason', {
            reason: 'Sorry, too much clients'
        })
        socket.disconnect()

    } else {

        addClient(socket)
        sendClientList()

        // сообщаем состояние новым клиентам
        io.emit('update', game)

        // при получении сохраняем и пересылаем всем
        socket.on('update', function(data) {
            game = data
            io.emit('update', game)
        })

        socket.on('disconnect', function(socket) {
            removeClient(socket)
            sendClientList()
        })

    }

})

function addClient(socket) {
    clients.counter++
    console.log(clients.counter)
    clients.list.push({
        id: socket.id
    })
}

function removeClient(socket) {
    clients.counter--
    clients.list.splice(clients.list.indexOf(socket.id), 1)
}

function sendClientList() {
    io.emit('clients', clients)
}

http.listen(port, function() {
    console.log('served at http://localhost:' + port)
});
