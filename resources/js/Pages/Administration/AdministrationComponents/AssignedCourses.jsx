import React from "react";
import useCourseList from "../../../Stores/Programs/courseLIstStore";
import RoleGuard from "../../../Components/Auth/RoleGuard";
import EmptyState from "../../../Components/EmptyState/EmptyState";

export default function AssignedCourses() {
    // User Store
    const courseList = useCourseList((state) => state.courseList);
    return (
        <div className="font-nunito-sans spave-y-5">
            <h1 className="text-size6 font-bold">Assigned Courses</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="border-b-2 border-ascend-gray3 text-ascend-black font-bold">
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Course Status</th>
                            <th>Permision</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList &&
                            courseList?.length > 0 &&
                            courseList.map((course) => (
                                <tr
                                    key={course.id}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>{course.courseCode}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.courseStatus}</td>
                                    <RoleGuard allowedRoles={["admin"]}>
                                        <td>
                                            <select className="textField w-25 py-2 ">
                                                <option value="view_only">
                                                    View only
                                                </option>
                                                <option value="can_edit">
                                                    Can edit
                                                </option>
                                            </select>
                                        </td>
                                    </RoleGuard>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {courseList?.length === 0 && (
                    <EmptyState
                        imgSrc={"/images/illustrations/not_assigned.svg"}
                        text={`No assigned courses found. Head over to Programs to assign a course.`}
                    />
                )}
            </div>
        </div>
    );
}
