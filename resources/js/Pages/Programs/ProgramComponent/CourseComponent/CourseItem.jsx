import React from "react";
import { MdDelete } from "react-icons/md";
import { formatTime } from "../../../../Utils/FormatTime";
import useCourseStore from "../../../../Stores/Programs/courseStore";

export default function CourseItem({ course }) {
    // Course Store
    const removeCourse = useCourseStore((state) => state.removeCourse);

    return (
        <div className="flex flex-wrap py-4 items-center justify-between space-x-10">
            <div className="w-40 flex-1">
                <p className="text-size3 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {course.course_code && `${course.course_code} - `}
                    {course.course_name}
                </p>
                <p className="text-size1">
                    <span className="capitalize">
                        {course.course_day && `${course.course_day} - `}
                    </span>
                    <span>
                        {course.start_time &&
                            `${formatTime(course.start_time)} to `}
                        {course.end_time && formatTime(course.end_time)}
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
