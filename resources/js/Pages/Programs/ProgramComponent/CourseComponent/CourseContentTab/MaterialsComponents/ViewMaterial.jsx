import React from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "../../../../../../../css/quillTextEditor.css";
import DOMPurify from "dompurify";
import { AiFillFile } from "react-icons/ai";

export default function ViewMaterial() {
    // const postHtml = DOMPurify.sanitize(postContent.postDescription);
    const materialDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans">
            <div className="flex">
                <BackButton />
            </div>
            <div className="space-y-5 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <div className="w-full">
                        <h1 className="flex-1 min-w-0 text-size6 break-words font-semibold">
                            EDUC 101 - Facilitating Learners
                        </h1>
                        <span className="text-size1">
                            John Doe | April 07, 2025
                        </span>
                    </div>

                    <div className="dropdown dropdown-end cursor-pointer ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="rounded-4xl p-3 hover:bg-ascend-lightblue transition-all duration-300"
                        >
                            <BsThreeDotsVertical className="text-size5 text-ascend-black" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-ascend-white w-32 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Remove
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <ReactQuill
                    value={materialDesc}
                    readOnly={true}
                    theme={"bubble"}
                />
            </div>
            <div className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white cursor-pointer">
                <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                    <AiFillFile
                        className={`shrink-0 text-ascend-blue text-size5`}
                    />
                    <h4 className="ml-2 truncate">File 1</h4>
                </div>
            </div>
        </div>
    );
}
