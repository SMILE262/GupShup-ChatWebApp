import {app, server} from "./socket/socket.js"
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDb } from "./db/connectionDb.js";
import cookieParser from "cookie-parser";

connectDb();

app.use(
  cors({
    origin: ["https://gupshup-chatwebappbackend.onrender.com"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.port || 5000;
//routes
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

//middleware
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { Socket } from "socket.io";
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Your server listening on port ${port}`);
});
