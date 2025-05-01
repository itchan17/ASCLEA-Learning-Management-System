import { useState, useEffect } from "react";
import { MdNotifications } from "react-icons/md";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar({ setIsSidebarOpen, isMdScreen }) {
    const { url } = usePage();

    // States
    const [pageTitle, setPageTitle] = useState("");
    console.log("Render Navbar");

    useEffect(() => {
        switch (url) {
            case "/dashboard":
                setPageTitle("Dashboard");
                break;
            case "/student-analytics":
                setPageTitle("Student Analytics");
                break;
            case "/staff":
                setPageTitle("Staff");
                break;
            case "/enrollment":
                setPageTitle("Enrollment");
                break;
            case "/programs":
                setPageTitle("Programs");
                break;
            case "/calendar":
                setPageTitle("Calendar");
                break;
            default:
                setPageTitle("");
        }
    }, [url]);

    // Open sidebar
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    return (
        <nav className="h-20 w-full flex items-center justify-between px-6 font-nunito-sans text-ascend-black">
            <div className="flex items-center space-x-3 md:space-x-6">
                {isMdScreen && (
                    <button
                        onClick={openSidebar}
                        className="cursor-pointer hover:bg-ascend-lightblue p-2 transition-hover duration-300"
                    >
                        <div className="w-6 h-5 space-y-1 flex flex-col justify-center">
                            <span className="block h-[3px] w-full bg-ascend-black rounded"></span>
                            <span className="block h-[3px] w-full bg-ascend-black rounded"></span>
                            <span className="block h-[3px] w-full bg-ascend-black rounded"></span>
                        </div>
                    </button>
                )}
                <h1 className="text-size4 font-bold">{pageTitle}</h1>
            </div>

            <div className="flex items-center space-x-3 md:space-x-6">
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
