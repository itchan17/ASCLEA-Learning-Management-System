import { useState, useEffect, useRef } from "react";
import { MdNotifications } from "react-icons/md";
import { usePage } from "@inertiajs/react";
import ProfileDropdown from "../Navbar/ProfileDropdown";
import NotifDropdown from "./NotifDropdown";

export default function Navbar({ setIsSidebarOpen, isMdScreen }) {
    const { url } = usePage();

    // States
    const [pageTitle, setPageTitle] = useState("");
    const [dropDown, setDropdown] = useState("");
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);
    const profileRef = useRef(null);

    console.log("Render Navbar");

    // Set the dropdown to be displayed when clicked
    const openDropdown = (dropdown) => {
        setDropdown((prev) => (dropdown === prev ? "" : dropdown));
    };

    // Open sidebar
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

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

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                !notifRef.current.contains(e.target) &&
                !profileRef.current.contains(e.target)
            ) {
                setDropdown("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            className={`relative h-20 w-full flex items-center justify-between ${
                isMdScreen ? "pl-3 pr-6" : "px-6"
            } font-nunito-sans text-ascend-black border`}
        >
            <div className="flex items-center space-x-1 md:space-x-6">
                {isMdScreen && (
                    <button
                        onClick={openSidebar}
                        className="cursor-pointer hover:bg-ascend-lightblue p-3 rounded-[50px] transition-hover duration-300"
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

            <div className="flex items-center space-x-1 md:space-x-6">
                <div
                    ref={notifRef}
                    onClick={() => openDropdown("notif")}
                    className="hover:bg-ascend-lightblue p-3 rounded-[50px] cursor-pointer relative transition-hover duration-300"
                >
                    <div className=" h-[10px] w-[10px] border rounded-xl bg-ascend-blue absolute right-[15px] top-4 border-ascend-white"></div>
                    <MdNotifications className="text-size6" />
                </div>

                <img
                    ref={profileRef}
                    src="https://avatar.iran.liara.run/public"
                    alt="Profile image"
                    className="w-12 h-12 rounded-full cursor-pointer object-cover"
                    onClick={() => openDropdown("profile")}
                ></img>
            </div>

            {/* Dropdown */}
            {dropDown === "notif" && <NotifDropdown ref={dropdownRef} />}
            {dropDown === "profile" && <ProfileDropdown ref={dropdownRef} />}
        </nav>
    );
}
