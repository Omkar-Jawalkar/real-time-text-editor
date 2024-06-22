import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import homeRoutes from "./src/routes/home.routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import e from "express";

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
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(homeRoutes);

const createRoomInLocalDatabase = (roomId, username, socketId) => {
    let room = roomData[roomId];
    if (room) {
        room.push({ socketId: socketId, username: username });
    } else {
        roomData[roomId] = [{ socketId: socketId, username: username }];
    }
};

const removeSocketFromLocalDatabaseWhileDisconnecting = (socketId, roomId) => {
    let newRoomWithRemovedDisconnectedSocket = roomData[roomId]?.filter(
        (item) => {
            return item?.socketId !== socketId;
        }
    );
    if (roomId) roomData[roomId] = newRoomWithRemovedDisconnectedSocket || [];
};

const sendEditorContentToSpecificSocket = (room, socketId) => {
    let firstSocketId = room[0].socketId;

    io.to(firstSocketId).emit(
        "make-emit-to-send-editor-content-to-joined-user",
        socketId
    );
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

app.get("/editor-content", (req, res) => {
    const { roomId, socketId } = req.query;

    const room = roomData[roomId] || [];

    if (room.length > 0) {
        sendEditorContentToSpecificSocket(room, socketId);
        res.send({
            data: { isContentComming: true },
            error: false,
            message: "",
        });
    } else {
        res.send({
            data: { isContentComming: false },
            error: false,
            message: "",
        });
    }
});

// IO Config
io.on("connection", (socket) => {
    socket.on("join-room", async (roomIdAndUsername, cb) => {
        try {
            let { roomId, username, isRefreshing } = roomIdAndUsername;
            const joinStatus = await socket.join(roomId);
            roomId = String(roomId);
            createRoomInLocalDatabase(roomId, username, socket.id);
            io.to(roomId).emit("users-joins-or-leaves", {
                users: roomData[roomId],
            });

            if (isRefreshing) {
                const room = roomData[roomId] || [];
                if (room.length > 0) {
                    sendEditorContentToSpecificSocket(room, socket.id);
                }
            }
            cb(false, "Joined the room");
        } catch (e) {
            cb(true, "Error Joining Room");
        }
    });

    socket.on("get-users", (roomId) => {});

    socket.on("leave-room", (roomId, cb) => {});

    socket.on(
        "send-editor-content-to-joined-user",
        (roomId, socketIdToEmitWholeEditorContent, wholeEditorContent) => {
            io.to(socketIdToEmitWholeEditorContent).emit(
                "recieve-editor-content-to-joined-user",
                wholeEditorContent
            );
        }
    );

    // changed Content
    socket.on("send-editor-content", (roomId, content) => {
        console.log(content);
        socket.broadcast.to(roomId).emit("receive-editor-content", content);
    });

    socket.on("disconnecting", () => {
        // convert Set to Array
        let roomsJoinedBySocket = Array.from(socket.rooms);

        let foundRoomId;
        // Pick the RoomID from mapping in rooms joined by Socket
        roomsJoinedBySocket.map((roomId) => {
            if (roomData[roomId]) {
                foundRoomId = roomId;
            }
        });

        // remove the socket from database
        removeSocketFromLocalDatabaseWhileDisconnecting(socket.id, foundRoomId);

        if (foundRoomId) {
            io.to(foundRoomId).emit("users-joins-or-leaves", {
                users: roomData[foundRoomId] || [],
            });
        }
    });
});

server.listen(port, () => {
    console.log("server listening on port 8080" + "http://localhost:" + port);
});
