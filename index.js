const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const port = process.env.PORT || 5000;  // server port

app.use(cors());  //prevent CORS policy
app.use(express.json)  //to get json data

//below code for creating socket server
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {  //prevent CORS policy
    cors: { origin: "*" },
});

// below code for socket.io server
io.on('connection', (socket) => {
    console.log('New user conntected.', socket.id)  //used for monitoring new connected users


    socket.on('chatMsg', (data) => {
        socket.emit('receiveMsg', data)  //send user sending message to client side
        socket.broadcast.emit('brodcastMsg', data)  //send all message without new sending message to client side
    })

    socket.on('disconnect', () => {
        console.log('User disconnect')  //used for monitoring disconnected users
    })
})

app.get("/", (req, res) => {
    res.send("server is running");  //used for monitoring node API is working or not
})

//code for server running
server.listen(port, () => {
    console.log('server is running on port:', port)  //used for monitoring node server is running or not
})