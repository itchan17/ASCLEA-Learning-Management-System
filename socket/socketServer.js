// socketServer.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

const httpServer = createServer(app);

const port = process.env.SOCKET_IO_PORT || 3000;
const host = process.env.SOCKET_IO_HOST || "http://localhost";

const io = new Server(httpServer, {
    cors: {
        origin: "*", // allow frontend to connect
    },
});

// Keep track of online students
let onlineStudents = new Map(); // key: user, value: socket.id

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Student comes online
    socket.on("student_online", ({ user }) => {
        console.log(user);
        onlineStudents.set(user, socket.id);
        io.emit("online_students", Array.from(onlineStudents.keys()));
        console.log("Online students:", Array.from(onlineStudents.keys()));
    });

    // Heartbeat ping to keep online status
    socket.on("student_ping", ({ user }) => {
        if (onlineStudents.has(user)) {
            // update timestamp or keep alive
        }
    });

    // Student leaves or disconnects
    socket.on("disconnect", () => {
        for (let [user, sId] of onlineStudents.entries()) {
            if (sId === socket.id) onlineStudents.delete(user);
        }
        io.emit("online_students", Array.from(onlineStudents.keys()));
        console.log("Client disconnected:", socket.id);
    });

    socket.on("student_offline", ({ user }) => {
        onlineStudents.delete(user);
        io.emit("online_students", Array.from(onlineStudents.keys()));
    });
});

httpServer.listen(port, () => {
    console.log(`Socket.IO server running on ${host}:${port}`);
});
