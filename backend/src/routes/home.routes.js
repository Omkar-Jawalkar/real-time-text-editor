import express from "express";
import { home } from "../controllers/home.controller.js";

const app = express.Router();

app.get("/", home);

export default app;
