import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function CustomSelect({ selectField, spaceRight = "2" }) {
    return (
        <div className="relative">
            {selectField}
            <div
                className={`pointer-events-none absolute inset-y-0 right-${spaceRight} flex items-center`}
            >
                <MdKeyboardArrowDown className="text-size5" />
            </div>
        </div>
    );
}
