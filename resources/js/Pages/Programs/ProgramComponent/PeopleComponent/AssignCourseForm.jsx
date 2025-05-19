import React from "react";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import useUserStore from "../../../../Stores/Programs/userStore";

export default function AssignCourseForm({ toggleModal }) {
    // User Store
    const handleAddCourseChange = useUserStore(
        (state) => state.handleAddCourseChange
    );
    const handleAddCourse = useUserStore((state) => state.handleAddCourse);

    const addCoourse = () => {
        handleAddCourse();
        toggleModal();
    };

    const courses = [
        {
            id: 1,
            courseCode: "Educ 101",
            courseName: "Facilitating Learners",
            courseStatus: "Ongoing",
        },
        {
            id: 2,
            courseCode: "Math 201",
            courseName: "Advanced Algebra",
            courseStatus: "Completed",
        },
        {
            id: 3,
            courseCode: "Sci 102",
            courseName: "Basic Biology",
            courseStatus: "Ongoing",
        },
        {
            id: 4,
            courseCode: "Hist 210",
            courseName: "World History",
            courseStatus: "Pending",
        },
    ];

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center text-ascend-black">
            <form className="bg-ascend-white opacity-100 p-5 w-120 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <h1 className="text-size4 font-bold">Assign Course</h1>
                {courses?.length > 0 && (
                    <div className="max-h-72 overflow-y-auto divide-y-1 divide-ascend-gray1">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="py-5 flex items-center space-x-5"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-ascend-blue w-4 h-4"
                                    onChange={() =>
                                        handleAddCourseChange(course)
                                    }
                                />
                                <p className="font-semibold">
                                    <span>
                                        {course.courseCode &&
                                            `${course.courseCode} - `}
                                    </span>
                                    <span>{course.courseName}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        doSomething={toggleModal}
                        text={"Cancel"}
                    />
                    <PrimaryButton
                        doSomething={addCoourse}
                        btnType={"submit"}
                        text={"Add"}
                    />
                </div>
            </form>
        </div>
    );
}
