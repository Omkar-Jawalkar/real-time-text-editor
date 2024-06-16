import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import homeRoutes from "./src/routes/home.routes.js";
import bodyParser from "body-parser";

const app = express();
const server = createServer(app);

//Local Data base

let roomData = {}; // roomId : [users]

// IO server
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

let port = 8080;

// Middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(homeRoutes);

const createRoomInLocalDatabase = (roomId, username, socketId) => {
    let room = roomData[roomId];
    if (room) {
        room.push({ socketId: socketId, username: username });
    } else {
        roomData[roomId] = [{ socketId: socketId, username: username }];
        console.log(roomData, "joined");
    }
};

app.get("/users", (req, res) => {
    const { roomId } = req.body;
    let users = roomData[roomId] || [];
    res.send({
        data: { users: users },
        error: false,
        message: "",
    });
});

// IO Config
io.on("connection", (socket) => {
    socket.on("join-room", async (roomIdAndUsername, cb) => {
        let { roomId, username } = roomIdAndUsername;
        try {
            const joinStatus = await socket.join(roomId);
            console.log(joinStatus, "joined");
            createRoomInLocalDatabase(roomId, username, socket.id);
            cb(false, "Joined the room");
        } catch (e) {
            cb(true, "Error Joining Room");
        }
    });

    socket.on("leave-room", (roomId, cb) => {});

    socket.on("user-status", (roomId, statusMessage, cb) => {});

    socket.on("share-editor-content", (roomId, content) => {});

    socket.on("disconnect", () => {});
});

server.listen(port, () => {
    console.log("server listening on port 8080" + "http://localhost:" + port);
});
