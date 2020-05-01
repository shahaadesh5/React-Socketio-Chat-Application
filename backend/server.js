const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUserInRoom } = require('./controllers/users');

const PORT = process.env.PORT || 5000;

const router = require('./routes/router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
    console.log("New connection!");

    socket.on('join', ({name,room}, callback)=>{
        const { error, user } = addUser({
            id: socket.id,
            name,
            room
        });
        if(error)
            return callback(error);
        console.log(user);
        socket.join(user.room);
        socket.emit('message',{user:'admin', text:`Welcome ${user.name}, to the room`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined!`});

    });

    socket.on('sendMessage', (message)=>{
        const user = getUser(socket.id);
        console.log(user);
        console.log(message);
        io.to(user.room).emit('message',{user:user.name, text:message});
        
    });

    socket.on('disconnect' ,()=>{
        console.log("User left");
    })
});

app.use(router);

server.listen(PORT,()=> console.log(`Server has started on port ${PORT}`));