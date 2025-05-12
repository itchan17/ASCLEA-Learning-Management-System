import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PrimaryButton from "../../../Components/Button/PrimaryButton";

export default function AddCourse({ toggleAddCourse }) {
    const saveCourse = () => {
        toggleAddCourse();
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-[1fr_2fr] gap-5">
                <div>
                    <label htmlFor="">Course Code</label>
                    <input
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="">
                        Course Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="">Course Description</label>
                <textarea
                    name=""
                    id=""
                    className="border w-full p-2 focus:outline-ascend-blue"
                    rows={5}
                ></textarea>
            </div>

            <div>
                <h1>Select Schedule:</h1>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="">
                            Day
                            <span className="text-ascend-red">*</span>
                        </label>
                        <div className="relative">
                            <select
                                className="w-full rounded-none appearance-none border p-2 h-9 text-size1  focus:outline-ascend-blue"
                                name="Select Course"
                                id=""
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
                            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                                <MdKeyboardArrowDown className="text-size5" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">
                            Time
                            <span className="text-ascend-red">*</span>
                        </label>
                        <input
                            className="border w-full p-2 h-9 focus:outline-ascend-blue"
                            type="time"
                            placeholder="Select Time"
                        />
                    </div>
                </div>
            </div>
            <PrimaryButton doSomething={saveCourse} text={"Save"} />
        </div>
    );
}
