import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function SidebarLink({
    linkUrl,
    text,
    icon: Icon,
    expanded,
    setIsSidebarOpen,
    closeSidebar,
}) {
    const { url } = usePage();

    return (
        <Link
            onClick={closeSidebar}
            className={`h-11 flex items-center text-ascend-black ${
                url === linkUrl &&
                "bg-ascend-lightblue border-l-8 text-ascend-blue border-ascend-blue font-bold"
            } hover:bg-ascend-lightblue hover:border-l-8 hover:text-ascend-blue hover:font-bold transition-all duration-100 ${
                expanded ? "mr-6" : "justify-center"
            }`}
            href={linkUrl}
        >
            <Icon className={`text-size6 ${expanded && "ml-6"}`} />

            <span
                className={`block text-size3 truncate   ${
                    expanded
                        ? "max-w-[200px] ml-5 transition-all duration-300"
                        : "max-w-0"
                }`}
            >
                {text}
            </span>
        </Link>
    );
}
