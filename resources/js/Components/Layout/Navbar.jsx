import React from "react";
import { MdNotifications } from "react-icons/md";

export default function Navbar() {
    console.log("Render Navbar");
    return (
        <nav className="border h-20 w-full flex items-center justify-between px-6 font-nunito-sans">
            <h1 className="text-size4 font-bold">Dashboard</h1>
            <div className="flex items-center space-x-6">
                <MdNotifications className="text-size6 cursor-pointer" />
                <img
                    src="/"
                    alt="Profile image"
                    className="bg-gray-400 w-10 h-10 rounded-[50%] cursor-pointer"
                ></img>
            </div>
        </nav>
    );
}
