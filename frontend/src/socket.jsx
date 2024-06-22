import { io } from "socket.io-client";
const URL =
    process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);
