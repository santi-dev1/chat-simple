const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {

    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('send-message', (message) => {
        io.emit('receive-message', message);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
