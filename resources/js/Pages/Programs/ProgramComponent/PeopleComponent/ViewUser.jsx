import { useState } from "react";
import BackButton from "../../../../Components/Button/BackButton";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import { IoSearch } from "react-icons/io5";
import AssignCourseForm from "./AssignCourseForm";
import useUserStore from "../../../../Stores/Programs/userStore";
import { handleClickBackBtn } from "../../../../Utils/handleClickBackBtn";
import RoleGuard from "../../../../Components/Auth/RoleGuard";

export default function ViewUser() {
    // User Store
    const courseList = useUserStore((state) => state.courseList);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className=" space-y-5 text-ascend-black">
            <div className="flex justify-between items-center ">
                <BackButton doSomething={handleClickBackBtn} />
                <RoleGuard allowedRoles={["admin"]}>
                    <PrimaryButton
                        doSomething={toggleModal}
                        text={"Assign Course"}
                    />
                </RoleGuard>
            </div>
            <div className="flex items-center space-x-5">
                <div className="w-16 h-16 bg-ascend-gray1 rounded-4xl"></div>
                <div className="flex flex-col">
                    <span className="text-size4 font-bold">John Doe</span>
                    <span>Student</span>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative">
                    <input
                        className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search name"
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>
            {/* Course Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Course Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList?.length > 0 &&
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
                                            <span className="text-ascend-red underline">
                                                Remove
                                            </span>
                                        </td>
                                    </RoleGuard>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && <AssignCourseForm toggleModal={toggleModal} />}
        </div>
    );
}
