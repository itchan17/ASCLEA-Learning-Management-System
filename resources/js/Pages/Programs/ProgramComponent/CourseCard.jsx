import { useState } from "react";
import { PiNotebookFill } from "react-icons/pi";

export default function CourseCard() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const text =
        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.";

    console.log(text.length);
    return (
        <div className="w-100 h-full border border-ascend-gray1 shadow-shadow1 p-5 cursor-pointer space-y-4">
            <div className="flex items-start space-x-5">
                <div className="p-2 rounded-[100px] bg-ascend-lightblue">
                    <PiNotebookFill className="text-5xl text-ascend-blue" />
                </div>
                <div className="w-full">
                    <h1 className="text-size3 font-bold">
                        Educ 101 - Facilitating Learners
                    </h1>
                    <p className="text-size1">
                        {isExpanded
                            ? text
                            : `${text.slice(0, 80)}${
                                  text.length > 80 && "..."
                              }`}
                    </p>
                    <div className="w-full text-end">
                        {text.length > 80 && (
                            <span
                                onClick={toggleExpanded}
                                className="text-size1 font-bold"
                            >
                                {isExpanded ? " See less" : "See more"}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center space-x-5">
                <span className="text-size1">
                    Last updated on March 29, 2025
                </span>
                <span className="bg-ascend-green px-2 py-1 text-size1 font-semibold text-ascend-white">
                    Completed
                </span>
            </div>
        </div>
    );
}
