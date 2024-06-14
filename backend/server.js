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

app.use(cors());
app.use(homeRoutes);

io.on("connection", (socket) => {
    socket.on("join-room", (roomId, cb) => {
        socket.join(roomId);
        socket
            .to(roomId)
            .emit("room-messages", `${socket.id} Joined ` + roomId);
        cb(`You Joined`);
    });

    socket.on("send-message", (roomId, message, cb) => {
        socket.to(roomId).emit("room-messages", `${socket.id} - ${message}`);
        cb(`You - ${message}`);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => {
    console.log("server listening on port 8080" + "http://localhost:" + port);
});
