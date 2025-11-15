import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { formatDueDateTime } from "../../../../../../Utils/formatDueDateTime";
import { formatFullDate } from "../../../../../../Utils/formatFullDate";
import RoleGuard from "../../../../../../Components/Auth/RoleGuard";
import { capitalize } from "lodash";
import AssessmentForm from "./AssessmentForm";
import { closeDropDown } from "../../../../../../Utils/closeDropdown";
import useAssessmentsStore from "./Stores/assessmentsStore";
import { displayToast } from "../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../Components/CustomToast/DefaultCustomToast";
import axios from "axios";
import ModalContainer from "../../../../../../Components/ModalContainer";
import File from "../File";
import { getRemainingDays } from "../../../../../../Utils/getRemainingDays";
import ModalDocViewer from "../../../../../../Components/ModalDocViewer";
import { MdQuiz } from "react-icons/md";
import { BsFillClipboard2CheckFill } from "react-icons/bs";

export default function AssessmentItem({
    assessmentDetails,
    setIsAssessmentFormOpen,
}) {
    // Assessment Store
    const setAssessmentDetails = useAssessmentsStore(
        (state) => state.setAssessmentDetails
    );
    const updateAssessmentInList = useAssessmentsStore(
        (state) => state.updateAssessmentInList
    );

    // get the id from url
    const { course, program, auth } = usePage().props;

    const [isEdit, setIsEdit] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileDownload, setFileDownload] = useState(null);
    const [fileName, setFileName] = useState(null);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleCardClick = () => {
        if (!assessmentDetails.deleted_at) {
            router.visit(
                route("program.course.assessment.view", {
                    program: program.program_id,
                    course: course.course_id,
                    assessment: assessmentDetails.assessment_id,
                }),
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }
    };

    const handleQuizClick = () => {
        if (!assessmentDetails.deleted_at) {
            // Check if the user is student, if true it will navigate the user to quiz instruction page
            // instead of the edit quiz form
            if (auth.user.role_name === "student") {
                router.visit(
                    route("assessment.quiz.instruction", {
                        course: course.course_id,
                        assessment: assessmentDetails.assessment_id,
                        quiz: assessmentDetails.quiz.quiz_id,
                    })
                );
            } else if (auth.user.user_id === assessmentDetails.created_by) {
                router.visit(
                    route("assessment.quiz-form.edit", {
                        assessment: assessmentDetails.assessment_id,
                        quiz: assessmentDetails.quiz.quiz_id,
                    })
                );
            }
        }
    };

    const handleEditClick = () => {
        closeDropDown();
        setIsEdit(true);
        setIsAssessmentFormOpen(false); // Close the add assessment form if open
    };

    const unpublishAssessment = async () => {
        closeDropDown();

        try {
            const response = await axios.put(
                route("assessment.unpublish", {
                    program: program.program_id,
                    course: course.course_id,
                    assessment: assessmentDetails.assessment_id,
                })
            );

            updateAssessmentInList(response.data.data, course.course_id);

            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again."}
                />,
                "error"
            );
        }
    };

    const handleArchiveAsessment = async () => {
        closeDropDown();
        console.log(assessmentDetails.assessment_id);
        try {
            const response = await axios.delete(
                route("assessment.archive", {
                    program: program.program_id,
                    course: course.course_id,
                    assessment: assessmentDetails.assessment_id,
                })
            );
            console.log(response);
            updateAssessmentInList(
                response.data.archivedAssessment,
                course.course_id
            );

            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again."}
                />,
                "error"
            );
        }
    };

    const handleRestoreAsessment = async () => {
        closeDropDown();
        console.log(assessmentDetails.assessment_id);
        try {
            const response = await axios.put(
                route("assessment.restore", {
                    program: program.program_id,
                    course: course.course_id,
                    assessment: assessmentDetails.assessment_id,
                })
            );
            console.log(response);
            updateAssessmentInList(
                response.data.restoredAssessment,
                course.course_id
            );

            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again"}
                />,
                "error"
            );
        }
    };

    const handleFileClick = (fileId, fileName) => {
        const url = route("program.course.file.stream", {
            program: program.program_id,
            course: course.course_id,
            assessment: assessmentDetails.assessment_id,
            file: fileId,
        });

        const fileDownload = route("program.course.file.download", {
            program: program.program_id,
            course: course.course_id,
            assessment: assessmentDetails.assessment_id,
            file: fileId,
        });

        setFileUrl(url);
        setFileDownload(fileDownload);
        setFileName(fileName);
    };

    const handleViewFileClose = () => {
        setFileUrl(null);
        setFileName(null);
        setFileDownload(null);
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className="flex flex-col justify-between border border-ascend-gray1 shadow-shadow1 p-5 space-y-5 cursor-pointer card-hover mt-5"
            >
                <div className="flex items-start sm:items-center gap-2 md:gap-2">
                    <div className="flex-1 min-w-0 flex flex-wrap gap-5">
                        <div className="flex items-center gap-2">
                            {assessmentDetails.assessment_type
                                .assessment_type === "quiz" ? (
                                <MdQuiz className="text-ascend-blue text-size5" />
                            ) : (
                                <BsFillClipboard2CheckFill className="text-ascend-blue text-size5" />
                            )}

                            <h1 className="text-size2 truncate font-bold">
                                {assessmentDetails.assessment_type
                                    .assessment_type === "quiz"
                                    ? "New Quiz"
                                    : "New Activity"}
                            </h1>
                        </div>

                        {assessmentDetails.deleted_at ? (
                            <div className="flex flex-wrap gap-2">
                                <div className={`px-2 bg-ascend-red h-fit`}>
                                    <span className="text-size1 font-bold text-ascend-white">
                                        {"Archived"}
                                    </span>
                                </div>
                                <span className="font-bold">
                                    {`Permanently deleted in
                                   ${getRemainingDays(
                                       assessmentDetails.deleted_at,
                                       30
                                   )}
                                    days`}
                                </span>
                            </div>
                        ) : (
                            assessmentDetails.author.user_id ===
                                auth.user.user_id && (
                                <div
                                    className={`px-2 ${
                                        assessmentDetails.status === "published"
                                            ? "px-2 bg-ascend-green"
                                            : "px-2 bg-ascend-yellow"
                                    }`}
                                >
                                    <span className="text-size1 font-bold text-ascend-white">
                                        {assessmentDetails.status ===
                                        "published"
                                            ? "Published"
                                            : "Draft"}
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    {auth.user.user_id === assessmentDetails.created_by && (
                        <RoleGuard allowedRoles={["admin", "faculty"]}>
                            <div className="flex items-center">
                                <div
                                    onClick={stopPropagation}
                                    className="dropdown dropdown-end cursor-pointer"
                                >
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="rounded-4xl p-1 -mr-1 hover:bg-ascend-lightblue transition-all duration-300"
                                    >
                                        <BsThreeDotsVertical className="text-size3" />
                                    </div>

                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu space-y-2 font-bold bg-ascend-white w-45 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                                    >
                                        {assessmentDetails.deleted_at ? (
                                            <li
                                                onClick={handleRestoreAsessment}
                                            >
                                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                    Restore assessment
                                                </a>
                                            </li>
                                        ) : (
                                            <>
                                                {assessmentDetails.status ===
                                                "draft" ? (
                                                    <li
                                                        onClick={
                                                            handleEditClick
                                                        }
                                                    >
                                                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                            Edit assessment
                                                        </a>
                                                    </li>
                                                ) : (
                                                    <li
                                                        onClick={
                                                            unpublishAssessment
                                                        }
                                                    >
                                                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                            Unpublish Assessment
                                                        </a>
                                                    </li>
                                                )}
                                                <li
                                                    onClick={
                                                        handleArchiveAsessment
                                                    }
                                                >
                                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                        Archive assessment
                                                    </a>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </RoleGuard>
                    )}
                </div>
                <div>
                    <h1 className="flex-1 min-w-0 text-size4 truncate font-bold">
                        {assessmentDetails.assessment_title}
                    </h1>
                    <span className="text-size1">
                        {assessmentDetails.due_datetime &&
                            `Due on ${formatDueDateTime(
                                assessmentDetails.due_datetime
                            )}`}
                    </span>
                </div>

                {assessmentDetails.quiz && (
                    <div
                        onClick={(e) => {
                            stopPropagation(e);
                            handleQuizClick();
                        }}
                        className={`flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white ${
                            auth.user.role_name === "student" ||
                            auth.user.user_id === assessmentDetails.created_by
                                ? "hover-change-bg-color cursor-pointer"
                                : ""
                        }`}
                    >
                        <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                            <SiGoogleforms className="text-size5 text-ascend-blue" />
                            <h4 className="ml-2 truncate">
                                {assessmentDetails.quiz.quiz_title}
                            </h4>
                        </div>
                    </div>
                )}
                {assessmentDetails.files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {assessmentDetails.files.map((file) => (
                            <File
                                key={file.assessment_file_id}
                                fileName={file.file_name}
                                onClick={() =>
                                    handleFileClick(
                                        file.assessment_file_id,
                                        file.file_name
                                    )
                                }
                            ></File>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap-reverse justify-between items-baseline font-nunito-sans gap-2">
                    <span className="text-size1">
                        {assessmentDetails.created_at !==
                        assessmentDetails.updated_at
                            ? ` Updated on ${formatDueDateTime(
                                  assessmentDetails.updated_at
                              )}`
                            : ` Posted on ${formatFullDate(
                                  assessmentDetails.created_at
                              )}`}
                    </span>
                    <span className="font-bold">
                        {`${capitalize(
                            assessmentDetails.author.first_name
                        )} ${capitalize(assessmentDetails.author.last_name)}`}
                    </span>
                </div>
            </div>

            {fileUrl && (
                <ModalDocViewer
                    fileName={fileName}
                    fileUrl={fileUrl}
                    onClose={handleViewFileClose}
                    fileDownload={fileDownload}
                />
            )}

            {isEdit && (
                <ModalContainer>
                    <AssessmentForm
                        assessmentId={assessmentDetails.assessment_id}
                        formTitle={`Edit ${capitalize(
                            assessmentDetails.assessment_type.assessment_type
                        )}`}
                        isEdit={isEdit}
                        setIsAssessmentFormOpen={setIsEdit}
                        formWidth="max-w-200"
                        assessmentDetailsToEdit={assessmentDetails}
                    />
                </ModalContainer>
            )}
        </>
    );
}
