import React from "react";
import { MdDelete } from "react-icons/md";
import { formatTime } from "../../../Utils/FormatTime";
import useCourseStore from "../../../Stores/Programs/courseStore";

export default function CourseItem({
    index,
    courseCode,
    courseName,
    courseDay,
    fromTime,
    toTime,
}) {
    // Course Store
    const removeCourse = useCourseStore((state) => state.removeCourse);

    return (
        <div className="flex flex-wrap py-4 items-center justify-between space-x-10">
            <div className="w-40 flex-1">
                <p className="text-size3 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {courseCode && `${courseCode} - `}
                    {courseName}
                </p>
                <p className="text-size1">
                    <span className="capitalize">
                        {courseDay && `${courseDay} - `}
                    </span>
                    <span>
                        {fromTime && `${formatTime(fromTime)} to `}
                        {toTime && formatTime(toTime)}
                    </span>
                </p>
            </div>

            <MdDelete
                onClick={() => removeCourse(index)}
                className="text-ascend-red text-size5 cursor-pointer"
            />
        </div>
    );
}
