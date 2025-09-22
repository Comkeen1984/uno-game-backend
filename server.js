// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET","POST"] }
});

app.get("/", (req, res) => {
  res.send("UNO Game Backend is running");
});

io.on("connection", socket => {
  console.log("🚀 New client connected:", socket.id);
  socket.on("joinTable", ({ tableId, userId }) => {
    console.log(`User ${userId} joins table ${tableId}`);
    io.to(tableId).emit("tableUpdate", {});
  });
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`UNO Backend listening on port ${PORT}`);
});
