import { useEffect, useState } from "react";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import axios from "axios";
import { route } from "ziggy-js";
import { router, usePage } from "@inertiajs/react";
import { capitalize } from "lodash";
import { formatTime } from "../../../../Utils/formatTime";
import Loader from "../../../../Components/Loader";
import DefaultCustomToast from "../../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../../Utils/displayToast";
import ModalContainer from "../../../../Components/ModalContainer";

export default function AssignCourseForm({ toggleModal }) {
    const { member_data: memberData } = usePage().props;

    const [coursesToAssign, setCoursesToassign] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [isAssignLoading, setIsAssignLoading] = useState(false);

    // Fetches the courses to bes assigned when the components was rendered
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);

            try {
                const courses = await axios.get(
                    route("program.member.assign.courses.list", {
                        program: memberData.program_id,
                        member: memberData.learning_member_id,
                    })
                );

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

    const handleAssignCourseChange = (courseId) => {
        const updatedCourses = selectedCourses.some((id) => id === courseId) // Check if id is already selected
            ? selectedCourses.filter((id) => id !== courseId) // If true filter out the duplciate id
            : [...selectedCourses, courseId]; // Else add it

        // Unchecked the select all is user unselect all the courses
        // This means user clicked select all then unchecked all the user
        if (updatedCourses.length === 0 && isSelectAll) {
            setIsSelectAll(!isSelectAll);
        }

        setSelectedCourses(updatedCourses);
    };

    const handleSelecAllCourses = () => {
        // Check if the select all is false
        // This is the inital state and we're only setting it to true after running this block
        if (!isSelectAll) {
            const selectedCoursesId = coursesToAssign.map(
                (course) => course.course_id
            );
            setSelectedCourses(selectedCoursesId);
        } else {
            setSelectedCourses([]);
        }

        // This is when we set the state of the select all
        setIsSelectAll(!isSelectAll);
    };

    const handleAssignCourse = () => {
        if (selectedCourses.length > 0) {
            setIsAssignLoading(true);
            console.log(memberData);
            router.post(
                route("program.member.assign.courses.store", {
                    program: memberData.program_id,
                    member: memberData.learning_member_id,
                }),
                { courses_to_assign: selectedCourses },
                {
                    showProgress: false,
                    only: ["assigned_courses", "flash"],
                    onFinish: () => setIsAssignLoading(false),
                    onSuccess: (page) => {
                        setIsAssignLoading(false);
                        toggleModal();
                        displayToast(
                            <DefaultCustomToast
                                message={page.props.flash.success}
                            />,
                            "success"
                        );
                    },
                }
            );
        }
    };

    return (
        <ModalContainer>
            <form className="bg-ascend-white opacity-100 p-5 w-160 space-y-5 font-nunito-sans">
                <h1 className="text-size4 font-bold">Assign Course</h1>

                {coursesToAssign.length > 0 && (
                    <div className="flex items-center mb-0 gap-2">
                        <input
                            type="checkbox"
                            checked={isSelectAll}
                            className="accent-ascend-blue w-4 h-4"
                            onChange={handleSelecAllCourses}
                        />
                        <span>Select all</span>
                    </div>
                )}

                <div className="h-72 overflow-y-auto divide-y-1 divide-ascend-gray1">
                    {!isLoading &&
                        coursesToAssign &&
                        coursesToAssign.length > 0 && (
                            <>
                                {coursesToAssign.map((course) => (
                                    <div
                                        key={course.course_id}
                                        className="py-5 flex items-center space-x-5"
                                    >
                                        <input
                                            type="checkbox"
                                            className="accent-ascend-blue w-4 h-4"
                                            checked={selectedCourses.some(
                                                (id) => id === course.course_id
                                            )}
                                            onChange={() =>
                                                handleAssignCourseChange(
                                                    course.course_id
                                                )
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
                        isDisabled={isAssignLoading}
                        doSomething={toggleModal}
                        text={"Cancel"}
                    />
                    <PrimaryButton
                        isLoading={isAssignLoading}
                        isDisabled={isAssignLoading}
                        doSomething={handleAssignCourse}
                        btnType={"submit"}
                        text={"Assign"}
                    />
                </div>
            </form>
        </ModalContainer>
    );
}
