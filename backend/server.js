import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import homeRoutes from "./src/routes/home.routes.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
let port = 8080;

app.use(homeRoutes);

io.on("connection", (socket) => {
    console.log("User is connected ");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => {
    console.log("server listening on port 8080" + "http://localhost:" + port);
});