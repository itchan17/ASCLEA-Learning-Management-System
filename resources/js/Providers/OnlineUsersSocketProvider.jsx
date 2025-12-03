import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useOnlineStudentStore from "../Pages/Dashboard/Stores/onlineStudentStore";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export default function OnlineUsersSocketProvider({ children, user }) {
    const setOnlineStudents = useOnlineStudentStore(
        (state) => state.setOnlineStudents
    );

    const socketRef = useRef(null);

    useEffect(() => {
        if (!user || socketRef.current) return; // already connected

        const host = import.meta.env.VITE_MAIN_URL;
        const path = import.meta.env.VITE_SOCKET_IO_PATH;
        const port = import.meta.env.VITE_SOCKET_IO_PORT;
        const url = port ? `${host}:${port}` : host;

        const socket = io(url, {
            path,
            transports: ["websocket"],
            reconnection: true,
        });

        socketRef.current = socket;

        socket.emit("user_online", { user });

        const ping = setInterval(
            () => socket.emit("student_ping", { user }),
            30000
        );

        const handleUnload = () => socket.emit("student_offline", { user });
        window.addEventListener("beforeunload", handleUnload);

        // Get the list of online users
        socket.on("online_students", setOnlineStudents);

        return () => {
            clearInterval(ping);
            window.removeEventListener("beforeunload", handleUnload);
            socket.off("online_students", setOnlineStudents);
        };
    }, [user]);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
}
