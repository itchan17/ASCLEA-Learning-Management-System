import React from "react";
import CustomSelect from "../../../../Components/CustomInputField/CustomSelect";
import useCourseStore from "../../../../Stores/Programs/courseStore";

export default function AddCourse({ errors }) {
    //Course Store
    const course = useCourseStore((state) => state.course);
    const handleCourseChange = useCourseStore(
        (state) => state.handleCourseChange
    );

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-5">
                <div>
                    <label htmlFor="">Course Code</label>
                    <input
                        value={course.course_code}
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                        onChange={(e) =>
                            handleCourseChange("course_code", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="">
                        Course Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        value={course.course_name}
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                        onChange={(e) =>
                            handleCourseChange("course_name", e.target.value)
                        }
                    />
                    {errors && errors.course_name && (
                        <span className="text-ascend-red">
                            {errors.course_name}
                        </span>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="">Course Description</label>
                <textarea
                    value={course.course_description || ""}
                    id=""
                    className="border w-full p-2 focus:outline-ascend-blue"
                    rows={5}
                    onChange={(e) =>
                        handleCourseChange("course_description", e.target.value)
                    }
                ></textarea>
            </div>

            <div>
                <h1>Select Schedule:</h1>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-5">
                    <div>
                        <label htmlFor="">Day</label>
                        <CustomSelect
                            selectField={
                                <select
                                    className="w-full rounded-none appearance-none border p-2 h-9 text-size1  focus:outline-ascend-blue"
                                    value={course.course_day}
                                    onChange={(e) =>
                                        handleCourseChange(
                                            "course_day",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option className="" value="">
                                        Select Day
                                    </option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select>
                            }
                        />
                        {errors && errors.course_day && (
                            <span className="text-ascend-red">
                                {errors.course_day}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="">From</label>
                                <input
                                    value={course.start_time}
                                    className="border w-full p-2 h-9 focus:outline-ascend-blue"
                                    type="time"
                                    placeholder="Select Time"
                                    onChange={(e) =>
                                        handleCourseChange(
                                            "start_time",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="">To</label>
                                <input
                                    value={course.end_time}
                                    className="border w-full p-2 h-9 focus:outline-ascend-blue"
                                    type="time"
                                    placeholder="Select Time"
                                    onChange={(e) =>
                                        handleCourseChange(
                                            "end_time",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {errors && errors.end_time && (
                            <span className="text-ascend-red">
                                {errors.end_time}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
