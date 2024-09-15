const express = require('express');
const path =  require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const adminNm = 'admin';


//set static folder
app.use(express.static(path.join(__dirname, 'public')));


//run when client connects
io.on('connection', socket => {

    socket.emit('message', formatMessage(adminNm, 'Welcome'));

    socket.broadcast.emit('message', formatMessage(adminNm, 'A user has joined'));

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(adminNm, 'A user has left'));
    });

    socket.on('chatMsg', (msg) => {
        io.emit('message', formatMessage('user', msg));
    });
})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));   