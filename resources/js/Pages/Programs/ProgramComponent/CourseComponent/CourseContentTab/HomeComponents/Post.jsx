import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "../../../../../../../css/quillTextEditor.css";
import DOMPurify from "dompurify";

export default function Post({ postContent }) {
    const postHtml = DOMPurify.sanitize(postContent.postDescription);

    return (
        <div className="">
            <div className="flex items-start gap-2 md:gap-20 px-5 py-2 text-ascend-white bg-ascend-blue">
                <h1 className="flex-1 min-w-0 text-size4 break-words font-semibold">
                    {postContent.postTitle}
                </h1>

                <div className="h-8 flex items-center">
                    <div className="dropdown dropdown-end cursor-pointer">
                        <div
                            tabIndex={0}
                            role="button"
                            className="rounded-4xl p-1 -mr-1 hover:bg-ascend-lightblue/35 transition-all duration-300"
                        >
                            <BsThreeDotsVertical className="text-size3" />
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
            </div>
            <div className="flex flex-col justify-between border-b border-r border-l border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
                <ReactQuill value={postHtml} readOnly={true} theme={"bubble"} />

                <div className="flex flex-wrap-reverse justify-between items-baseline font-nunito-sans gap-2">
                    <span className="text-size1">Posted on March 29, 2025</span>
                    <span className="font-bold">John Doe</span>
                </div>
            </div>
        </div>
    );
}
