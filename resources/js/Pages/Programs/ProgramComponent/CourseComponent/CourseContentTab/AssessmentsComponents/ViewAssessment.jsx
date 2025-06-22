import React from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "../../../../../../../css/quillTextEditor.css";
import DOMPurify from "dompurify";
import "../../../../../../../css/global.css";
import File from "../File";
import Quiz from "./Quiz";
import { handleClickBackBtn } from "../../../../../../Utils/handleClickBackBtn";

export default function ViewAssessment() {
    // const postHtml = DOMPurify.sanitize(postContent.postDescription);
    const materialDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans">
            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>
            <div className="space-y-5 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <div className="w-full min-w-0">
                        <h1 className="text-size6 break-words font-semibold">
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
                            className="dropdown-content menu bg-ascend-white w-42 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    View responses
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Edit assessment
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Archive assessment
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Reset assessment
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
            <div className="flex flex-wrap justify-between">
                <h1 className="font-bold">Possible Points: 100</h1>
                <h1 className="font-bold">Due on April 30 at 11:59pm</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <File />
                <Quiz />
            </div>
        </div>
    );
}
