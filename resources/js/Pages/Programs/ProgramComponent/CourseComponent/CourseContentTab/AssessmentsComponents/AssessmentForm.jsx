import { useState, useEffect } from "react";
import TextEditor from "../../TextEditor";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import useAssessmentsStore from "../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import CustomSelect from "../../../../../../Components/CustomInputField/CustomSelect";
import { AiFillFileAdd } from "react-icons/ai";
import "../../../../../../../css/global.css";
import DropFiles from "../../DropFiles";
import FileCard from "../../FileCard";
import { SiGoogleforms } from "react-icons/si";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { IoCaretDownOutline } from "react-icons/io5";

export default function AssessmentForm({
    toggleForm,
    formTitle,
    formWidth,
    sectionId,
}) {
    const { programId, courseId } = usePage().props;
    const route = useRoute();

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
    const hanndleAddAssessments = useAssessmentsStore(
        (state) => state.hanndleAddAssessments
    );
    const handleCreateIntialQuizForm = useAssessmentsStore(
        (state) => state.handleCreateIntialQuizForm
    );
    const clearAssessmentDetails = useAssessmentsStore(
        (state) => state.clearAssessmentDetails
    );

    const [isShowDropFiles, setIsShowDropFiles] = useState(false);

    const handleCLickEditForm = (quizFormId) => {
        router.visit(
            route("program.course.quiz-form.edit", {
                programId,
                courseId,
                quizFormId,
            })
        );
    };
    useEffect(() => {
        console.log(assessmentDetails);
    }, [assessmentDetails]);

    const toggleShowDropFiles = () => {
        setIsShowDropFiles(!isShowDropFiles);
    };

    const changeAsssessmentType = (quizType) => {
        // check if the type is quiz
        if (quizType === "quiz") {
            // this will create an empty quiz form
            handleCreateIntialQuizForm();
        }
        handleAssessmentChange("assessmentType", quizType);
    };

    const cancelAssessmentForm = () => {
        toggleForm();
        clearAssessmentDetails();
    };

    const addAssessment = () => {
        toggleForm();
        hanndleAddAssessments(sectionId);
        clearAssessmentDetails();
    };
    return (
        <div
            className={`border ${formWidth} border-ascend-gray1 shadow-shadow1 p-5 space-y-5 bg-ascend-white`}
        >
            <h1 className="text-size4 font-bold">
                {formTitle || "Add Assessment"}
            </h1>
            <div
                className={`grid sm:grid-cols-2 ${
                    assessmentDetails.assessmentType === "activity"
                        ? "lg:grid-cols-3"
                        : "lg:grid-cols-2"
                } gap-5`}
            >
                <div>
                    <label>Assessment Type</label>
                    <CustomSelect
                        selectField={
                            <select
                                value={assessmentDetails.assessmentType}
                                onChange={(e) =>
                                    changeAsssessmentType(e.target.value)
                                }
                                className="w-full rounded-none appearance-none border border-ascend-gray1 p-2 h-9  focus:outline-ascend-blue"
                            >
                                <option className="" value="">
                                    Select type
                                </option>
                                <option value="activity">Activity</option>
                                <option value="quiz">Quiz</option>
                            </select>
                        }
                    />
                </div>
                <div>
                    <label>Due Date and Time</label>
                    <input
                        value={assessmentDetails.assessmentDueDateTime || ""}
                        onChange={(e) =>
                            handleAssessmentChange(
                                "assessmentDueDateTime",
                                e.target.value
                            )
                        }
                        type="datetime-local"
                        className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                {assessmentDetails.assessmentType === "activity" && (
                    <div>
                        <label>Points</label>
                        <input
                            value={assessmentDetails.assessmentPoints}
                            onChange={(e) =>
                                handleAssessmentChange(
                                    "assessmentPoints",
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
                    value={assessmentDetails.assessmentTitle}
                    onChange={(e) =>
                        handleAssessmentChange(
                            "assessmentTitle",
                            e.target.value
                        )
                    }
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>
            <div>
                <label>Description</label>
                <TextEditor
                    fieldName={"assessmentDescription"}
                    value={assessmentDetails.assessmentDescription}
                    setValue={handleAssessmentChange}
                />
            </div>

            {/* Quiz Form */}
            {assessmentDetails.assessmentType === "quiz" && (
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
                assessmentDetails.assessmentType === "activity" && (
                    <DropFiles
                        handleFileChange={handleAssessmentChange}
                        fieldName={"assessmentFiles"}
                        toggleDropFiles={toggleShowDropFiles}
                    />
                )}

            {/* Display the attached files */}
            {assessmentDetails.assessmentFiles?.length > 0 &&
                assessmentDetails.assessmentType === "activity" && (
                    <>
                        <div>
                            <label className="font-bold pb-5">
                                Attached Files
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {assessmentDetails.assessmentFiles.map(
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
                    assessmentDetails.assessmentType === "activity"
                        ? "justify-between"
                        : "justify-end"
                }`}
            >
                {assessmentDetails.assessmentType === "activity" && (
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

                    <div className="flex space-x-[0.5px]">
                        <PrimaryButton
                            doSomething={addAssessment}
                            text={"Publish"}
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
                                className="text-size2 dropdown-content menu space-y-2 font-medium bg-ascend-white min-w-30 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                            >
                                <li>
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Publish
                                    </a>
                                </li>
                                <li>
                                    <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Save draft
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
