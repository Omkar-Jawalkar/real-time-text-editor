import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import homeRoutes from "./src/routes/home.routes.js";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

let port = 8080;

app.use(homeRoutes);

// let  roomData = {}; // roomId : [users]

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("join-room", (roomIdAndUsername, cb) => {
        let { roomId, username } = roomIdAndUsername;
        socket.join(roomId);
        socket.emit("user-status", { roomId: roomId, username: username });
        cb(false, "");
    });

    socket.on("leave-room", (roomId, cb) => {});

    socket.on("user-status", (roomId, statusMessage, cb) => {});

    socket.on("share-editor-content", (roomId, content) => {});

    socket.on("disconnect", () => {});
});

server.listen(port, () => {
    console.log("server listening on port 8080" + "http://localhost:" + port);
});
