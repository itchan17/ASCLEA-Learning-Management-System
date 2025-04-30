import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <div className="flex flex-col items-center w-full h-screen">
                <Navbar />
                <main className="flex-1 px-8 w-full max-w-[1900px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
