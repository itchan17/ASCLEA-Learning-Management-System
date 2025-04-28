import React from "react";

export default function Sidebar() {
    console.log("Render Sidebar");
    return (
        <aside className="hidden  md:flex md:w-20 lg:w-100 border-8 border-green-700">
            Sidebar
        </aside>
    );
}
