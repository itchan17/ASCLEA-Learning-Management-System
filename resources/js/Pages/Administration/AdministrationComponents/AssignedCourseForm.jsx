import { useEffect, useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import Loader from "../../../Components/Loader";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../Utils/displayToast";
import ModalContainer from "../../../Components/ModalContainer";
import { capitalize } from "lodash";
import { formatTime } from "../../../Utils/FormatTime";

export default function AssignedCourseForm({ toggleModal, coursesList = [], onAssign }) {
    const [coursesToAssign, setCoursesToAssign] = useState(coursesList);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [isAssignLoading, setIsAssignLoading] = useState(false);

    // Handle checkbox change
    const handleAssignCourseChange = (courseId) => {
        const updatedCourses = selectedCourses.includes(courseId)
            ? selectedCourses.filter((id) => id !== courseId)
            : [...selectedCourses, courseId];

        if (updatedCourses.length === 0 && isSelectAll) {
            setIsSelectAll(false);
        }

        setSelectedCourses(updatedCourses);
    };

    const handleSelectAllCourses = () => {
        if (!isSelectAll) {
            const allCourseIds = coursesToAssign.map((course) => course.course_id);
            setSelectedCourses(allCourseIds);
        } else {
            setSelectedCourses([]);
        }
        setIsSelectAll(!isSelectAll);
    };

    const handleAssignCourse = () => {
        if (selectedCourses.length > 0 && onAssign) {
            setIsAssignLoading(true);
            onAssign(selectedCourses)
                .then((message) => {
                    displayToast(<DefaultCustomToast message={message} />, "success");
                    toggleModal();
                })
                .finally(() => setIsAssignLoading(false));
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
                            onChange={handleSelectAllCourses}
                        />
                        <span>Select all</span>
                    </div>
                )}

                <div className="h-72 overflow-y-auto divide-y-1 divide-ascend-gray1">
                    {!isLoading && coursesToAssign.length > 0 && coursesToAssign.map((course) => (
                        <div key={course.course_id} className="py-5 flex items-center space-x-5">
                            <input
                                type="checkbox"
                                className="accent-ascend-blue w-4 h-4"
                                checked={selectedCourses.includes(course.course_id)}
                                onChange={() => handleAssignCourseChange(course.course_id)}
                            />
                            <div className="flex flex-col">
                                <p className="font-semibold text-size2">
                                    {course.course_code && `${course.course_code} - `}
                                    {course.course_name}
                                </p>
                                <p className="text-size1">
                                    {course.course_day && `${capitalize(course.course_day)} - `}
                                    {course.start_time && `${formatTime(course.start_time)} to ${formatTime(course.end_time)}`}
                                </p>
                            </div>
                        </div>
                    ))}

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
