import { useState } from "react";
import { IoImageSharp } from "react-icons/io5";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import CourseCard from "./CourseCard";
import AddCourseForm from "./AddCourseForm";
import useCourseStore from "../../../Stores/Programs/courseStore";

export default function Courses() {
    // Course Store
    const courseList = useCourseStore((state) => state.courseList);

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full space-y-5 font-nunito-sans">
            <div className="relative bg-ascend-gray1 w-full h-50 rounded-tl-xl rounded-br-xl">
                <label htmlFor="inputBg">
                    <IoImageSharp className="text-size4 text-ascend-black absolute top-2 right-2 cursor-pointer" />
                </label>
                <input className="hidden" type="file" id="inputBg" />
            </div>
            <div className="space-y-1 pb-5 border-b border-ascend-gray1">
                <h1 className="text-size7 break-words font-semibold">
                    Licensure Examination for Teachers
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div className="flex flex-wrap justify-between items-center">
                <CustomSelect
                    selectField={
                        <select className="w-35 rounded-none appearance-none border border-ascend-black p-2 h-9 text-size1  focus:outline-ascend-blue">
                            <option value="not_started">Not started</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    }
                />
                <PrimaryButton doSomething={toggleModal} text={"Add Course"} />
            </div>

            {/* Display moda form */}
            {isOpen && <AddCourseForm toggleModal={toggleModal} />}

            {/* Display courses */}
            <div className="w-full flex flex-wrap gap-5">
                {/* {courseList?.length > 0 ? (
                    courseList.map((course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                courseCode={course.courseCode}
                                courseName={course.courseName}
                                courseDescription={course.courseDescription}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/blank_canvas.svg"}
                        text={`“Nothing to see here… yet! Add some content to get going.”`}
                    />
                )} */}

                <CourseCard
                    courseId={1}
                    courseCode={"EDUC 101"}
                    courseName={"Facilitating Learners"}
                    courseDescription={
                        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                    }
                />
                <CourseCard
                    courseId={2}
                    courseCode={"EDUC 101"}
                    courseName={"Facilitating Learners"}
                    courseDescription={
                        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                    }
                />
                <CourseCard
                    courseId={3}
                    courseCode={"EDUC 101"}
                    courseName={"Facilitating Learners"}
                    courseDescription={
                        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                    }
                />
            </div>
        </div>
    );
}
