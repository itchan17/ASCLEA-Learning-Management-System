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
import { displayToast } from "../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../Components/CustomToast/DefaultCustomToast";

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
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        setErrors(null);

        router.post(
            route("assessment.create", {
                program: program.program_id,
                course: course.course_id,
            }),
            { ...assessmentDetails },
            {
                preserveScroll: true,
                preserveState: true,
                onError: (error) => {
                    setErrors(error);
                },
                onSuccess: (page) => {
                    toggleForm();
                    clearAssessmentDetails();
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                },
                onFinish: () => setIsLoading(false),
            }
        );
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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
                    <label className="font-bold">
                        Assessment Type
                        <span className="text-ascend-red">*</span>
                    </label>
                    <select
                        value={assessmentDetails.assessment_type}
                        onChange={(e) => changeAsssessmentType(e.target.value)}
                        className={`textField w-full rounded-none appearance-none border border-ascend-gray1 px-3 py-2  focus:outline-ascend-blue ${
                            errors && errors.assessment_type
                                ? "border-2 border-ascend-red"
                                : ""
                        }`}
                    >
                        <option className="" value="">
                            Select type
                        </option>
                        <option value="activity">Activity</option>
                        <option value="quiz">Quiz</option>
                    </select>
                    {errors && errors.assessment_type && (
                        <span className="text-ascend-red">
                            {errors.assessment_type}
                        </span>
                    )}
                </div>
                <div>
                    <label className="font-bold">Due Date and Time</label>
                    <input
                        value={assessmentDetails.due_datetime || ""}
                        onChange={(e) =>
                            handleAssessmentChange(
                                "due_datetime",
                                e.target.value
                            )
                        }
                        type="datetime-local"
                        className={`px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue ${
                            errors && errors.due_datetime
                                ? "border-2 border-ascend-red"
                                : ""
                        }`}
                    />
                    {errors && errors.due_datetime && (
                        <span className="text-ascend-red">
                            {errors.due_datetime}
                        </span>
                    )}
                </div>

                {assessmentDetails.assessment_type === "activity" && (
                    <div>
                        <label className="font-bold">Total Points</label>
                        <input
                            value={assessmentDetails.total_points}
                            onChange={(e) =>
                                handleAssessmentChange(
                                    "total_points",
                                    e.target.value
                                )
                            }
                            type="number"
                            min="0"
                            onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
                            className={`px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue ${
                                errors && errors.total_points
                                    ? "border-2 border-ascend-red"
                                    : ""
                            }`}
                        />
                        {errors && errors.total_points && (
                            <span className="text-ascend-red">
                                {errors.total_points}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <div>
                <label className="font-bold">
                    Title<span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    value={assessmentDetails.assessment_title}
                    onChange={(e) =>
                        handleAssessmentChange(
                            "assessment_title",
                            e.target.value
                        )
                    }
                    className={`px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue ${
                        errors && errors.assessment_title
                            ? "border-2 border-ascend-red"
                            : ""
                    }`}
                />
                {errors && errors.assessment_title && (
                    <span className="text-ascend-red">
                        {errors.assessment_title}
                    </span>
                )}
            </div>
            <div>
                <label className="font-bold">Description</label>
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
                    <div>
                        <div className="mb-5">
                            <label className="font-bold">Attached Files</label>
                        </div>

                        <div
                            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ${
                                errors &&
                                Object.entries(errors).some(([key, message]) =>
                                    key.startsWith("assessment_files")
                                )
                                    ? "p-2 border-2 border-ascend-red"
                                    : ""
                            }`}
                        >
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

                        {errors && (
                            <div className="flex flex-col">
                                {Object.entries(errors).map(
                                    ([key, message]) => {
                                        if (
                                            key.startsWith("assessment_files")
                                        ) {
                                            return (
                                                <span className="text-ascend-red">
                                                    {message}
                                                </span>
                                            );
                                        }
                                    }
                                )}
                            </div>
                        )}
                    </div>
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
