import { io } from "socket.io-client";

// https://shareeditor-backend.30doer.site

const URL =
    process.env.NODE_ENV === "production"
        ? "https://shareeditor-backend.30doer.site"
        : "http://localhost:8080";

export const socket = io(URL);
