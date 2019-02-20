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
var status = [false, true, false]

io.on('connection', function(socket) {

    // сообщаем состояние новым клиентам
    io.emit('update', status)

    // при получении сохраняем и пересылаем всем
    socket.on('update', function(data) {
        status = data
        io.emit('update', status)
    })

})

http.listen(port, function() {
    console.log('served at http://localhost:' + port)
});
