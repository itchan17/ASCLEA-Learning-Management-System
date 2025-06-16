import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export default function MainLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMdScreen, setIsMdScreen] = useState(window.innerWidth < 1024);

    // Get the width of window
    useEffect(() => {
        const handleResize = () => {
            setIsMdScreen(window.innerWidth < 1024);
            // console.log(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close sidebar
    const closeSidebar = () => {
        console.log("Render closeSidebar");
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex relative h-screen">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isMdScreen={isMdScreen}
                closeSidebar={closeSidebar}
            />
            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black/25 z-40 lg:hidden transition-opacity duration-300"
                />
            )}
            <div className="flex flex-col items-center w-full h-screen overflow-x-hidden">
                <Navbar
                    setIsSidebarOpen={setIsSidebarOpen}
                    isMdScreen={isMdScreen}
                />
                <main
                    className="flex-1 px-6 py-2 sm:px-8 sm:py-5 w-full max-w-[1900px] overflow-y-auto"
                    scroll-region=""
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
