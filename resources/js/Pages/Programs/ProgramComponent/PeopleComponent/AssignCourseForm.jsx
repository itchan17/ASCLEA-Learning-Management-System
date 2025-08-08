import { useEffect, useState } from "react";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import useCourseList from "../../../../Stores/Programs/courseLIstStore";
import axios from "axios";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/react";
import { capitalize } from "lodash";
import { formatTime } from "../../../../Utils/formatTime";
import Loader from "../../../../Components/Loader";

export default function AssignCourseForm({ toggleModal }) {
    const { member_data: memberData } = usePage().props;

    // User Store
    const handleAddCourseChange = useCourseList(
        (state) => state.handleAddCourseChange
    );
    const handleAddCourse = useCourseList((state) => state.handleAddCourse);

    const addCoourse = () => {
        handleAddCourse();
        toggleModal();
    };

    const [coursesToAssign, setCoursesToassign] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);

            try {
                const courses = await axios.get(
                    route("program.member.assign.courses", {
                        program: memberData.program_id,
                        member: memberData.learning_member_id,
                    })
                );
                console.log(courses.data);
                setCoursesToassign([...courses.data]);
            } catch (error) {
                console.error(error);
                alert("Failed to load courses. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center text-ascend-black">
            <form className="bg-ascend-white opacity-100 p-5 w-160 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10 font-nunito-sans">
                <h1 className="text-size4 font-bold">Assign Course</h1>
                <div className="h-72 overflow-y-auto divide-y-1 divide-ascend-gray1">
                    {!isLoading &&
                        coursesToAssign &&
                        coursesToAssign.length > 0 && (
                            <>
                                {coursesToAssign.map((course) => (
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
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-size2">
                                                <span>
                                                    {course.course_code &&
                                                        `${course.course_code} - `}
                                                </span>
                                                <span>
                                                    {course.course_name}
                                                </span>
                                            </p>
                                            <p className="text-size1">
                                                {/* Display day */}
                                                {course.course_day && (
                                                    <span>{`${capitalize(
                                                        course.course_day
                                                    )} - `}</span>
                                                )}

                                                {/* Display time */}
                                                {course.start_time && (
                                                    <span>{`${formatTime(
                                                        course.start_time
                                                    )} to ${formatTime(
                                                        course.end_time
                                                    )} `}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                    {!isLoading && coursesToAssign.length === 0 && (
                        <div className="flex items-center justify-center min-h-full">
                            <h1 className="text-ascend-black font-nunito-sans text-size4">
                                No courses available
                            </h1>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex items-center justify-center min-h-full">
                            <Loader color="bg-ascend-blue" />
                        </div>
                    )}
                </div>

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
