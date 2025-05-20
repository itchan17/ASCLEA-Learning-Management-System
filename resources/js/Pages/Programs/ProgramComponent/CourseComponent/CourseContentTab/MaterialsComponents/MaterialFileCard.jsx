import React from "react";
import { AiFillFile, AiFillCloseCircle } from "react-icons/ai";
import useMaterialsStore from "../../../../../../Stores/Programs/CourseContent/materialsStore";

export default function MaterialFileCard({ fileName, fileId }) {
    const removeAttachedFile = useMaterialsStore(
        (state) => state.removeAttachedFile
    );

    return (
        <div className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white">
            <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                <AiFillFile
                    className={`shrink-0 text-ascend-blue text-size5`}
                />
                <h4 className="ml-2 truncate">{fileName}</h4>
            </div>

            <button
                onClick={() => removeAttachedFile(fileId)}
                type="button"
                className="cursor-pointer"
            >
                <AiFillCloseCircle
                    className={`text-ascend-blue hover:opacity-80 transition-all duration-300 
                                text-size5`}
                />
            </button>
        </div>
    );
}
