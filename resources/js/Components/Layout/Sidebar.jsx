import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

// Icon
import {
    MdSpaceDashboard,
    MdAnalytics,
    MdPeopleAlt,
    MdNoteAlt,
    MdCalendarMonth,
} from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";

export default function Sidebar() {
    const { url } = usePage();
    const [expanded, setExpanded] = useState(true);

    const toggleMenu = () => {
        setExpanded(!expanded);
    };

    console.log("Render Sidebar");
    return (
        <aside className="hidden md:block md:w-20 lg:w-100 shadow-[4px_0px_10px_0px_rgba(0,0,0,0.25)] space-y-6">
            <div className="h-20 flex items-center justify-between w-full  px-6">
                <img
                    src="/images/ascend_logo.png"
                    alt="Logo"
                    className="h-14"
                />
                {/* Menu button */}
                <button className="cursor-pointer" onClick={toggleMenu}>
                    <div className="w-6 h-5 space-y-1 flex flex-col items-end justify-center">
                        <span
                            className={`${
                                expanded
                                    ? "block h-[3px] w-4 bg-black rounded"
                                    : "block h-[3px] w-full bg-black rounded"
                            } transition-all duration-200`}
                        ></span>
                        <span className="block h-[3px] w-full bg-black rounded"></span>
                        <span
                            className={`${
                                expanded
                                    ? "block h-[3px] w-3 bg-black rounded"
                                    : "block h-[3px] w-full bg-black rounded"
                            } transition-all duration-200`}
                        ></span>
                    </div>
                </button>
            </div>
            <ul className="space-y-6 mr-6 font-nunito-sans font-semibold">
                <li>
                    <Link
                        className={`h-11 flex items-center ${
                            url === "/dashboard"
                                ? " bg-ascend-lightblue border-l-8 text-ascend-blue border-ascend-blue font-bold"
                                : ""
                        } hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-200`}
                        href="/dashboard"
                    >
                        <MdSpaceDashboard className="text-size6 ml-6" />
                        <span className="text-size3 ml-5">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-11 flex items-center hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-200"
                        href="/student-analytics"
                    >
                        <MdAnalytics className="text-size6 ml-6" />
                        <span className="text-size3 ml-5">
                            Student Analytics
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-11 flex items-center hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-200"
                        href="/staff"
                    >
                        <MdPeopleAlt className="text-size6 ml-6" />
                        <span className="text-size3 ml-5">Staff</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-11 flex items-center hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-200"
                        href="/enrollment"
                    >
                        <PiUserListFill className="text-size6 ml-6" />
                        <span className="text-size3 ml-5">Enrollment</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-11 flex items-center hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-200"
                        href="/programs"
                    >
                        <MdNoteAlt className="text-size6 ml-6" />
                        <span className="text-size3 ml-5">Programs</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-11 flex items-center hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-200"
                        href="/calendar"
                    >
                        <MdCalendarMonth className="text-size6 ml-6" />
                        <span className="text-size3 ml-5">Calendar</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
