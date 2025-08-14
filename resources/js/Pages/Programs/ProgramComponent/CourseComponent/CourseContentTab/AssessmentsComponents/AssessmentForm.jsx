import { useState, useEffect } from "react";
import TextEditor from "../../TextEditor";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import useAssessmentsStore from "../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import { AiFillFileAdd } from "react-icons/ai";
import "../../../../../../../css/global.css";
import DropFiles from "../../../../../../Components/DragNDropFiles/DropFiles";
import FileCard from "../../FileCard";
import { SiGoogleforms } from "react-icons/si";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { IoCaretDownOutline } from "react-icons/io5";
import { closeDropDown } from "../../../../../../Utils/closeDropdown";

export default function AssessmentForm({
    toggleForm,
    formTitle,
    formWidth,
    sectionId,
}) {
    const { program, course } = usePage().props;

    // Assessments Store
    const assessmentDetails = useAssessmentsStore(
        (state) => state.assessmentDetails
    );
    const handleAssessmentChange = useAssessmentsStore(
        (state) => state.handleAssessmentChange
    );
    const removeAttachedFile = useAssessmentsStore(
        (state) => state.removeAttachedFile
    );
    // const hanndleAddAssessments = useAssessmentsStore(
    //     (state) => state.hanndleAddAssessments
    // );
    const handleCreateIntialQuizForm = useAssessmentsStore(
        (state) => state.handleCreateIntialQuizForm
    );
    const clearAssessmentDetails = useAssessmentsStore(
        (state) => state.clearAssessmentDetails
    );

    const [isShowDropFiles, setIsShowDropFiles] = useState(false);
    const [primaryBtnText, setPrimaryBtnText] = useState("Publish");

    const handleCLickEditForm = (quizFormId) => {
        router.visit(
            route("program.course.quiz-form.edit", {
                programId: program.program_id,
                courseId: course.course_id,
                quizFormId: 1,
            })
        );
    };

    const toggleShowDropFiles = () => {
        setIsShowDropFiles(!isShowDropFiles);
    };

    const changeAsssessmentType = (assessmentType) => {
        // check if the type is quiz
        if (assessmentType === "quiz") {
            // this will create an empty quiz form
            handleCreateIntialQuizForm();
        }
        handleAssessmentChange("assessment_type", assessmentType);
    };

    const cancelAssessmentForm = () => {
        toggleForm();
        clearAssessmentDetails();
    };

    const handleSaveAssessment = () => {
        router.post(
            route("assessment.create", {
                program: program.program_id,
                course: course.course_id,
            }),
            { ...assessmentDetails },
            {
                onError: (error) => console.log(error),
                onSuccess: (page) => console.log("Page" + page),
            }
        );
        console.log(assessmentDetails);
        // toggleForm();
        // hanndleAddAssessments(sectionId);
        // clearAssessmentDetails();
    };

    const statusChange = (btnText, fieldName, status) => {
        closeDropDown();
        setPrimaryBtnText(btnText);
        handleAssessmentChange(fieldName, status);
    };
    return (
        <form
            className={`border ${formWidth} border-ascend-gray1 shadow-shadow1 p-5 space-y-5 bg-ascend-white`}
        >
            <h1 className="text-size4 font-bold">
                {formTitle || "Add Assessment"}
            </h1>
            <div
                className={`grid sm:grid-cols-2 ${
                    assessmentDetails.assessment_type === "activity"
                        ? "lg:grid-cols-3"
                        : "lg:grid-cols-2"
                } gap-5`}
            >
                <div>
                    <label>Assessment Type</label>
                    <select
                        value={assessmentDetails.assessment_type}
                        onChange={(e) => changeAsssessmentType(e.target.value)}
                        className="textField w-full rounded-none appearance-none border border-ascend-gray1 p-2 h-9  focus:outline-ascend-blue"
                    >
                        <option className="" value="">
                            Select type
                        </option>
                        <option value="activity">Activity</option>
                        <option value="quiz">Quiz</option>
                    </select>
                </div>
                <div>
                    <label>Due Date and Time</label>
                    <input
                        value={assessmentDetails.due_datetime || ""}
                        onChange={(e) =>
                            handleAssessmentChange(
                                "due_datetime",
                                e.target.value
                            )
                        }
                        type="datetime-local"
                        className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                {assessmentDetails.assessment_type === "activity" && (
                    <div>
                        <label>Points</label>
                        <input
                            value={assessmentDetails.total_points}
                            onChange={(e) =>
                                handleAssessmentChange(
                                    "total_points",
                                    e.target.value
                                )
                            }
                            type="number"
                            className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                        />
                    </div>
                )}
            </div>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={assessmentDetails.assessment_title}
                    onChange={(e) =>
                        handleAssessmentChange(
                            "assessment_title",
                            e.target.value
                        )
                    }
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>
            <div>
                <label>Description</label>
                <TextEditor
                    fieldName={"assessment_description"}
                    setValue={handleAssessmentChange}
                />
            </div>

            {/* Quiz Form */}
            {assessmentDetails.assessment_type === "quiz" && (
                <div className="space-y-5">
                    <div>
                        <label className="font-bold pb-5">Quiz Form</label>
                    </div>
                    <div
                        onClick={() =>
                            handleCLickEditForm(
                                assessmentDetails.assessmentQuiz.id
                            )
                        }
                        className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white hover-change-bg-color cursor-pointer"
                    >
                        <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                            <SiGoogleforms className="text-size5 text-ascend-blue" />
                            <h4 className="ml-2 truncate">
                                {assessmentDetails.assessmentQuiz.quizTitle}
                            </h4>
                        </div>
                    </div>
                </div>
            )}

            {/* Display drop files */}
            {isShowDropFiles &&
                assessmentDetails.assessment_type === "activity" && (
                    <DropFiles
                        handleFileChange={handleAssessmentChange}
                        fieldName={"assessment_files"}
                        toggleDropFiles={toggleShowDropFiles}
                    />
                )}

            {/* Display the attached files */}
            {assessmentDetails.assessment_files?.length > 0 &&
                assessmentDetails.assessment_type === "activity" && (
                    <>
                        <div>
                            <label className="font-bold pb-5">
                                Attached Files
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {assessmentDetails.assessment_files.map(
                                (file, index) => {
                                    return (
                                        <div key={index}>
                                            <FileCard
                                                removeAttachedFile={
                                                    removeAttachedFile
                                                }
                                                fileId={index}
                                                fileName={file.name}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </>
                )}

            <div
                className={`flex ${
                    assessmentDetails.assessment_type === "activity"
                        ? "justify-between"
                        : "justify-end"
                }`}
            >
                {assessmentDetails.assessment_type === "activity" && (
                    <SecondaryButton
                        doSomething={toggleShowDropFiles}
                        icon={<AiFillFileAdd />}
                        text={"Add Files"}
                    />
                )}
                <div className="flex gap-2">
                    <SecondaryButton
                        doSomething={cancelAssessmentForm}
                        text={"Cancel"}
                    />

                    <div className="flex space-x-[2px]">
                        <PrimaryButton
                            doSomething={handleSaveAssessment}
                            text={primaryBtnText}
                        />

                        {/* Dropdown button */}
                        <div className="dropdown dropdown-end cursor-pointer ">
                            <button
                                tabIndex={0}
                                role="button"
                                className="px-3 h-10 bg-ascend-blue hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300"
                            >
                                <div className="text-size1 ">
                                    {<IoCaretDownOutline />}
                                </div>
                            </button>

                            <ul
                                tabIndex={0}
                                className="text-size2 dropdown-content menu space-y-2 font-medium bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                            >
                                <li
                                    onClick={() =>
                                        statusChange(
                                            "Publsih",
                                            "status",
                                            "published"
                                        )
                                    }
                                >
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Publish
                                    </a>
                                </li>
                                <li
                                    onClick={() =>
                                        statusChange(
                                            "Save as Draft",
                                            "status",
                                            "draft"
                                        )
                                    }
                                >
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Save as draft
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
