require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const App = require("./src/app");
const db = require("./src/configs/db.config");

const app = express();

let server;

if (process.env.NODE_ENV === "production") {
    const https = require("https");
    server = https.createServer(app);
    console.log("Running in production mode.");
} else {
    const http = require("http");
    server = http.createServer(app);
    console.log("Running in development mode.");
}

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    
    console.log("Socket.IO client connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, message, sender }) => {
        io.to(roomId).emit("receiveMessage", { message, sender });
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

app.set("io", io);

const startServer = async () => {
    try {
        await db();
        await App(app);

        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error starting the server:", err);
        process.exit(1);
    }
};

startServer();