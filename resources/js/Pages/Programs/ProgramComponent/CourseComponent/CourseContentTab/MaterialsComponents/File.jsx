import React from "react";
import { AiFillFile } from "react-icons/ai";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function File() {
    const route = useRoute();

    const handleFileClick = () => {
        router.visit(
            route("program.course.material.file.view", {
                programId: 1,
                courseId: 1,
                materialId: 1,
                fileId: 1,
            })
        );
    };
    return (
        <div
            onClick={handleFileClick}
            className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white cursor-pointer hover-change-bg-color shadow-shadow2"
        >
            <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                <AiFillFile
                    className={`shrink-0 text-ascend-blue text-size5`}
                />
                <h4 className="ml-2 truncate">Sample.pdf</h4>
            </div>
        </div>
    );
}
