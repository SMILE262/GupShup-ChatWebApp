import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

// console.log("http://localhost:5173");

const io = new Server(server, {
  cors: {
    origin: "https://gupshup-chatwebappfrontend.onrender.com",
  },
});

const userSocketMap = {
  // userId : socketId,
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  userSocketMap[userId] = socket.id;
  console.log(Object.keys(userSocketMap));
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId]; 
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const getSocketId = (userId)=>{
  return userSocketMap[userId]
}

export { io, app, server, getSocketId };
