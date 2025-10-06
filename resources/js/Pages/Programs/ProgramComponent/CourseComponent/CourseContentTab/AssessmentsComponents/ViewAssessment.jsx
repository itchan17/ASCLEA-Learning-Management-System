import { useEffect, useState } from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "../../../../../../../css/quillTextEditor.css";
import DOMPurify from "dompurify";
import "../../../../../../../css/global.css";
import File from "../File";
import Quiz from "./Quiz";
import { handleClickBackBtn } from "../../../../../../Utils/handleClickBackBtn";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { formatFullDate } from "../../../../../../Utils/formatFullDate";
import { formatDueDateTime } from "../../../../../../Utils/formatDueDateTime";
import RoleGuard from "../../../../../../Components/Auth/RoleGuard";
import { hasText } from "../../../../../../Utils/hasText";
import { closeDropDown } from "../../../../../../Utils/closeDropdown";
import AcitivityMyWork from "./Features/Response/Components/AcitivityMyWork";

export default function ViewAssessment({
    programId,
    courseId,
    assessment,
    auth,
}) {
    const handleClickViewResponses = () => {
        router.visit(
            route("assessment.responses.view", {
                program: programId,
                course: courseId,
                assessment: assessment.assessment_id,
            })
        );
        closeDropDown();
    };

    const handleFileClick = (fileId) => {
        router.get(
            route("program.course.file.view", {
                program: programId,
                course: courseId,
                assessment: assessment.assessment_id,
                file: fileId,
            })
        );
    };

    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans">
            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>
            <div className="space-y-5 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <div className="w-full min-w-0">
                        <h1 className="text-size6 break-words font-semibold">
                            {assessment.assessment_title}
                        </h1>
                        <span className="text-size1">
                            {`${assessment.author.first_name} ${assessment.author.last_name}`}
                            {assessment.due_datetime &&
                                ` | ${formatFullDate(assessment.due_datetime)}`}
                        </span>
                    </div>

                    {(auth.user.role_name === "admin" ||
                        auth.user.user_id === assessment.created_by) && (
                        <RoleGuard allowedRoles={["admin", "faculty"]}>
                            <div className="dropdown dropdown-end cursor-pointer ">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="rounded-4xl p-3 hover:bg-ascend-lightblue transition-all duration-300"
                                >
                                    <BsThreeDotsVertical className="text-size5 text-ascend-black" />
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-ascend-white w-42 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                                >
                                    <li onClick={handleClickViewResponses}>
                                        <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                            View responses
                                        </a>
                                    </li>
                                    {auth.user.user_id ===
                                        assessment.created_by && (
                                        <li>
                                            <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                Reset assessment
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </RoleGuard>
                    )}
                </div>

                {hasText(assessment.assessment_description) && (
                    <ReactQuill
                        value={DOMPurify.sanitize(
                            assessment.assessment_description
                        )}
                        readOnly={true}
                        theme={"bubble"}
                    />
                )}
            </div>
            <div className="flex flex-wrap justify-between">
                <h1 className="font-bold">
                    Possible Points: {assessment.total_points}
                </h1>
                <h1 className="font-bold">
                    {assessment.due_datetime
                        ? `Due on
                    ${formatDueDateTime(assessment.due_datetime)}`
                        : "No due date"}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {assessment.quiz && <Quiz quizDetails={assessment.quiz} />}
                {assessment.files.length > 0 &&
                    assessment.files.map((file) => (
                        <File
                            key={file.assessment_file_id}
                            fileName={file.file_name}
                            onClick={() =>
                                handleFileClick(file.assessment_file_id)
                            }
                        />
                    ))}
            </div>

            {/* The section for student to upload their works for the activity */}
            {assessment.assessment_type.assessment_type === "activity" &&
                auth.user.role_name === "student" && <AcitivityMyWork />}
        </div>
    );
}
