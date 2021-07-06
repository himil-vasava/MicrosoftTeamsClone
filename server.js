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
const teamRoutes = require("./routes/teams.js");
const cors = require("cors");
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail')

const users = {};

const socketToRoom = {};

//on connection with client
io.on('connection', socket => {
    socket.on("join room", roomId => {
        //console.log(roomId);
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

    //send the data or message to all users present in the room
    socket.on("chat", (data) => {
        const roomId = socketToRoom[socket.id];
        users[roomId].forEach((id) => {
            io.to(id).emit('chat', {message: data.message, name: data.name});
        })
    })

    socket.on("meet", (email) => {
        const msg = {
            to: email.email, // Change to your recipient
            from: 'teamsclonehimil@gmail.com', // Change to your verified sender
            subject: 'Invite for the meeting',
            text: 'Here is the link for the meeting. '+ email.link,
            html: '<p><strong>Here is the link for the meeting.</strong></p> <br>'+  '<link>' + email.link + '</link>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
    })

    socket.on("Team", (data) => {
        const teamId = data.teamId;

        socket.join(teamId);
    })

    socket.on("teamchat", (data) => {
        const teamId = data.teamId;
        const name = data.name;

        io.to(teamId).emit('chatMessage', {message:data.message, name});
    })

    socket.on("teamInvite", (email) => {
        const msg = {
            to: email.email, // Change to your recipient
            from: 'teamsclonehimil@gmail.com', // Change to your verified sender
            subject: 'Invite to join Team',
            text: 'Here is code to join team.'+ email.teamId,
            html: '<p><strong>Here is code to join team.</strong></p> <br>'+  '<strong>' + email.teamId + '</strong>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
    })

});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.use('/user', userRoutes);
app.use('/teams', teamRoutes);

const port = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        server.listen(port, () => console.log(`server is running on ${port}`))
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    })
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);