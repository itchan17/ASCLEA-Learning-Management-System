import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../../../../../../css/global.css";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import RoleGuard from "../../../../../../Components/Auth/RoleGuard";

export default function MaterialItem({ materialDetails }) {
    const route = useRoute();

    // get the id from url
    const { programId, courseId } = usePage().props;

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleCardClick = () => {
        router.visit(
            route("program.course.material.view", {
                programId,
                courseId,
                materialId: materialDetails.id,
            }),
            {
                preserveScroll: false,
            }
        );
    };

    return (
        <div
            onClick={handleCardClick}
            className="flex flex-col justify-between border border-ascend-gray1 shadow-shadow1 p-5 space-y-5 cursor-pointer card-hover"
        >
            <div className="flex items-center gap-2 md:gap-20">
                <h1 className="flex-1 min-w-0 text-size2 truncate font-bold">
                    New material uploaded
                </h1>

                <RoleGuard allowedRoles={["admin", "faculty"]}>
                    <div className="h-8 flex items-center">
                        <div
                            onClick={stopPropagation}
                            className="dropdown dropdown-end cursor-pointer"
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                className="rounded-4xl p-1 -mr-1 hover:bg-ascend-lightblue transition-all duration-300"
                            >
                                <BsThreeDotsVertical className="text-size3" />
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu space-y-2 font-bold bg-ascend-white w-32 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                            >
                                <li>
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Edit
                                    </a>
                                </li>
                                <li>
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Remove
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </RoleGuard>
            </div>
            <h1 className="flex-1 min-w-0 text-size4 truncate font-bold">
                {materialDetails.materialTitle}
            </h1>

            <div className="flex flex-wrap-reverse justify-between items-baseline font-nunito-sans gap-2">
                <span className="text-size1">Posted on March 29, 2025</span>
                <span className="font-bold">John Doe</span>
            </div>
        </div>
    );
}
