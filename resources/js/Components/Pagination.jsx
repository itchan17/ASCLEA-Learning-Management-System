import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links, currentPage, lastPage, only }) {
    const filteredLinks = links.filter((link) => {
        const label = link.label.replace(/&laquo;|&raquo;|«|»/g, "").trim();

        // Always show Previous / Next
        if (label === "Previous" || label === "Next") return true;

        // Convert to number
        const pageNumber = Number(label);

        // Keep first, last, current ±2
        return (
            !isNaN(pageNumber) &&
            (pageNumber === 1 ||
                pageNumber === lastPage ||
                Math.abs(pageNumber - currentPage) <= 1)
        );
    });

    return (
        <div className="flex justify-end w-full mt-5">
            <div className="join font-nunito-sans">
                {filteredLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        preserveState
                        preserveScroll
                        only={only}
                        className={`join-item btn ${
                            link.active
                                ? "bg-ascend-blue text-ascend-white"
                                : " hover:bg-ascend-lightblue"
                        }`}
                    >
                        {link.label
                            .replace("«", "")
                            .replace("»", "")
                            .replace("&laquo;", "")
                            .replace("&raquo;", "")
                            .trim()}
                    </Link>
                ))}
            </div>
        </div>
    );
}
