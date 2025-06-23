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
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
const route = useRoute();

const handleCLickEditForm = () => {
    router.visit(
        route("program.course.quiz-form.edit", {
            programId: 1,
            courseId: 1,
            quizFormId: 1,
        })
    );
};

export default function AssessmentForm({ toggleForm, formTitle, formWidth }) {
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

    const [isShowDropFiles, setIsShowDropFiles] = useState(false);

    const toggleShowDropFiles = () => {
        setIsShowDropFiles(!isShowDropFiles);
    };

    useEffect(() => {
        console.log(assessmentDetails);
    }, [assessmentDetails]);

    return (
        <div
            className={`border ${formWidth} border-ascend-gray1 shadow-shadow1 p-5 space-y-5 bg-ascend-white`}
        >
            <h1 className="text-size4 font-bold">
                {formTitle || "Add Assessment"}
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                    <label>Assessment Type</label>
                    <CustomSelect
                        selectField={
                            <select
                                value={assessmentDetails.assessmentType}
                                onChange={(e) =>
                                    handleAssessmentChange(
                                        "assessmentType",
                                        e.target.value
                                    )
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
                    <label>Due Date</label>
                    <input
                        value={assessmentDetails.assessmentDueDate}
                        onChange={(e) =>
                            handleAssessmentChange(
                                "assessmentDueDate",
                                e.target.value
                            )
                        }
                        type="date"
                        className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                <div>
                    <label>
                        Duration<span className="text-size1"> (Minutes)</span>
                    </label>
                    <input
                        value={assessmentDetails.assessmentDuration}
                        onChange={(e) =>
                            handleAssessmentChange(
                                "assessmentDuration",
                                e.target.value
                            )
                        }
                        type="number"
                        min={1}
                        className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

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
                        onClick={handleCLickEditForm}
                        className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white hover-change-bg-color cursor-pointer"
                    >
                        <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                            <SiGoogleforms className="text-size5 text-ascend-blue" />
                            <h4 className="ml-2 truncate">Edit quiz form</h4>
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
                    <SecondaryButton doSomething={toggleForm} text={"Cancel"} />
                    <PrimaryButton
                        doSomething={hanndleAddAssessments}
                        text={"Add"}
                    />
                </div>
            </div>
        </div>
    );
}
