require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");
const mongoose = require('mongoose');
const userRoutes = require("./routes/users.js");
const cors = require("cors");
const bodyParser = require('body-parser');

const users = {};

const socketToRoom = {};

//on connection with client
io.on('connection', socket => {
    socket.on("join room", roomId => {
        if (users[roomId]) {
            const length = users[roomId].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomId].push(socket.id);
        } else {
            users[roomId] = [socket.id];
        }
        socketToRoom[socket.id] = roomId;
        const usersInThisRoom = users[roomId].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomId = socketToRoom[socket.id];
        let room = users[roomId];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomId] = room;
        }
        socket.broadcast.emit('user left', socket.id);
    });

    // socket.on("sending data",  (data) => {
    //     console.log(data.message);
    // })

    // socket.on("chat", (data) => {
    //     console.log(data.message);
    //     io.sockets.emit('chat', data);
    // })
});

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://himil:himil1234@cluster0.fycng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(port, () => console.log(`server is running on ${port}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);