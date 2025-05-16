import React from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";
import useCourseStore from "../../../Stores/Programs/courseStore";

export default function AddCourse({ toggleAddCourse }) {
    //Course Store
    const course = useCourseStore((state) => state.course);
    const handleCourseChange = useCourseStore(
        (state) => state.handleCourseChange
    );
    const addCourse = useCourseStore((state) => state.addCourse);

    const saveCourse = (e) => {
        e.preventDefault();
        addCourse();
        toggleAddCourse();
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-5">
                <div>
                    <label htmlFor="">Course Code</label>
                    <input
                        value={course.courseCode}
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                        onChange={(e) =>
                            handleCourseChange("courseCode", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="">
                        Course Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        value={course.courseName}
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                        onChange={(e) =>
                            handleCourseChange("courseName", e.target.value)
                        }
                    />
                </div>
            </div>
            <div>
                <label htmlFor="">Course Description</label>
                <textarea
                    value={course.courseDescription}
                    id=""
                    className="border w-full p-2 focus:outline-ascend-blue"
                    rows={5}
                    onChange={(e) =>
                        handleCourseChange("courseDescription", e.target.value)
                    }
                ></textarea>
            </div>

            <div>
                <h1>Select Schedule:</h1>
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-5">
                    <div>
                        <label htmlFor="">Day</label>
                        <CustomSelect
                            selectField={
                                <select
                                    className="w-full rounded-none appearance-none border p-2 h-9 text-size1  focus:outline-ascend-blue"
                                    value={course.courseDay}
                                    onChange={(e) =>
                                        handleCourseChange(
                                            "courseDay",
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
                    </div>
                    <div>
                        <label htmlFor="">From</label>
                        <input
                            value={course.fromTime}
                            className="border w-full p-2 h-9 focus:outline-ascend-blue"
                            type="time"
                            placeholder="Select Time"
                            onChange={(e) =>
                                handleCourseChange("fromTime", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="">To</label>
                        <input
                            value={course.toTime}
                            className="border w-full p-2 h-9 focus:outline-ascend-blue"
                            type="time"
                            placeholder="Select Time"
                            onChange={(e) =>
                                handleCourseChange("toTime", e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            <PrimaryButton doSomething={saveCourse} text={"Save"} />
        </div>
    );
}
