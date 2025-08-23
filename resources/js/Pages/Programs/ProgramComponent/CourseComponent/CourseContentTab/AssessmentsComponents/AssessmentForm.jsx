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
import { capitalize } from "lodash";
import axios from "axios";

export default function AssessmentForm({
    toggleForm,
    formTitle,
    formWidth,
    sectionId,
    isEdit = false,
    assessmentId,
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
    const removeUploadedFile = useAssessmentsStore(
        (state) => state.removeUploadedFile
    );
    const clearAssessmentDetails = useAssessmentsStore(
        (state) => state.clearAssessmentDetails
    );
    const addNewAssessment = useAssessmentsStore(
        (state) => state.addNewAssessment
    );
    const updateAssessmentInList = useAssessmentsStore(
        (state) => state.updateAssessmentInList
    );

    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Clear assessment details once form was rendered
    // to avoid persisting state
    useEffect(() => {
        if (!isEdit) {
            // If note edit this means user will create a new assessment
            // WE have to reset the value first
            clearAssessmentDetails();
        }
    }, []);

    const appendToFormData = (assessmentFormData) => {
        // Append data into FormData to enbale uploading files
        for (let key in assessmentDetails) {
            const value = assessmentDetails[key];

            // Skips appending data with null value
            // Make sure data is nullable in backend valdiation
            if (value === null || value === undefined) {
                continue;
            }

            // Append array values
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    assessmentFormData.append(`${key}[${i}]`, v);
                });
            } else {
                assessmentFormData.append(key, value);
            }
        }
    };

    // Handles axios request for adding assesment
    const addAssessment = async () => {
        // Append the assessment details to form data since
        // to enable file upaloading
        const assessmentFormData = new FormData();
        appendToFormData(assessmentFormData);

        const response = await axios.post(
            route("assessment.create", {
                program: program.program_id,
                course: course.course_id,
            }),
            assessmentFormData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        addNewAssessment(response.data.data);

        displayToast(
            <DefaultCustomToast message={response.data.success} />,
            "success"
        );
    };
    // Handles the axios request for updating
    const updateAssessment = async () => {
        // Append the assessment details to form data since
        // to enable file upaloading
        const assessmentFormData = new FormData();
        appendToFormData(assessmentFormData);
        assessmentFormData.append("_method", "PUT");

        const response = await axios.post(
            route("assessment.update", {
                program: program.program_id,
                course: course.course_id,
                assessment: assessmentId,
            }),
            assessmentFormData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        // Change the updated assessment data in the list
        updateAssessmentInList(response.data.data);

        displayToast(
            <DefaultCustomToast message={response.data.success} />,
            "success"
        );
    };

    const handeSubmit = async () => {
        setIsLoading(true);
        setErrors(null);

        try {
            if (isEdit) {
                await updateAssessment();
            } else {
                await addAssessment();
            }

            setIsLoading(false);
            toggleForm();
            clearAssessmentDetails();
        } catch (error) {
            console.error(error);
            // Check for value in response.data.errors
            // This is where the valdiation errors located
            // So we have to set it in the state that will display error
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                displayToast(
                    <DefaultCustomToast
                        message={"Something went wrong. Please try again."}
                    />,
                    "error"
                );
            }
            setIsLoading(false);
        }
    };

    const cancelAssessmentForm = () => {
        toggleForm();
        clearAssessmentDetails();
    };

    // Used for dropdown button to set the status of the assessment
    const statusChange = (fieldName, status) => {
        console.log("STATUS CHANGE");
        closeDropDown();
        handleAssessmentChange(fieldName, status);
    };

    const handleChooseAssessmentType = (assessmentType) => {
        // Check if type is quiz
        // Set the button to save as draft and status to draft
        // since user can only save quiz as draft to allow them to edit quiz form before publish
        if (assessmentType === "quiz") {
            handleAssessmentChange("status", "draft");
        }

        handleAssessmentChange("assessment_type", assessmentType);
    };

    // Hanndles displaying of toast to inform user
    // that assessment has to be save as draft first to enable quiz form editing
    const handleClickQuizInform = () => {
        const message = "Please save as draft first to edit the quiz.";
        displayToast(<DefaultCustomToast message={message} />, "info");
    };

    return (
        <form
            className={`border ${formWidth} border-ascend-gray1 ${
                isEdit ? "" : "shadow-shadow1"
            } p-5 space-y-5 bg-ascend-white`}
        >
            <h1 className="text-size4 font-bold">
                {!assessmentDetails.assessment_type
                    ? "Choose Assessment Type"
                    : formTitle ||
                      `Add ${capitalize(assessmentDetails.assessment_type)}`}
            </h1>

            {/* Options for choosing the assessment type */}
            {!assessmentDetails.assessment_type && (
                <div className="flex flex-wrap justify-center gap-5">
                    <div className="grid w-60 lg:w-80">
                        <PrimaryButton
                            doSomething={() =>
                                handleChooseAssessmentType("activity")
                            }
                            fontWeight="font-bold"
                            text={"Activity"}
                        />
                    </div>
                    <div className="grid w-60 lg:w-80">
                        <PrimaryButton
                            doSomething={() =>
                                handleChooseAssessmentType("quiz")
                            }
                            fontWeight="font-bold"
                            text={"Quiz"}
                        />
                    </div>
                </div>
            )}

            {/* Assessment Fields Start*/}
            {assessmentDetails.assessment_type && (
                <div className="space-y-5">
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 ${
                            assessmentDetails.assessment_type === "activity"
                                ? "lg:grid-cols-3"
                                : "lg:grid-cols-2"
                        } gap-5`}
                    >
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
                            <label className="font-bold">
                                Due Date and Time
                            </label>
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
                                <label className="font-bold">
                                    Total Points
                                </label>
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
                        <label className="font-bold">Description</label>
                        <TextEditor
                            value={assessmentDetails.assessment_description}
                            fieldName={"assessment_description"}
                            setValue={handleAssessmentChange}
                        />
                    </div>
                </div>
            )}
            {/* Assessment Fields End*/}

            {/* Quiz form palce holder to display */}
            {assessmentDetails.assessment_type === "quiz" && (
                <div className="space-y-5">
                    <div>
                        <label className="font-bold pb-5">Quiz Form</label>
                    </div>
                    <div
                        onClick={handleClickQuizInform}
                        className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white hover-change-bg-color cursor-pointer"
                    >
                        <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                            <SiGoogleforms className="text-size5 text-ascend-blue" />
                            <h4 className="ml-2 truncate">Quiz form</h4>
                        </div>
                    </div>
                </div>
            )}

            {/* Component for activity type */}
            {/* Display drop files */}
            {assessmentDetails.assessment_type === "activity" && (
                <DropFiles
                    handleFileChange={handleAssessmentChange}
                    fieldName={"assessment_files"}
                    withCancel={false}
                    allowedFiles={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg", ".jpg"],
                        "application/pdf": [".pdf"],
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                            [".pptx"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                            [".docx"],
                    }}
                />
            )}

            {/* Display the attached files */}
            {(assessmentDetails.assessment_files.length > 0 ||
                (isEdit && assessmentDetails?.uploaded_files.length > 0)) &&
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
                            {isEdit &&
                                assessmentDetails.uploaded_files.map((file) => (
                                    <div key={file.assessment_file_id}>
                                        <FileCard
                                            removeAttachedFile={() =>
                                                removeUploadedFile(
                                                    file.assessment_file_id
                                                )
                                            }
                                            fileId={file.assessment_file_id}
                                            fileName={file.file_name}
                                        />
                                    </div>
                                ))}

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

            {/* Form buttons Start*/}
            <div className={`flex justify-end`}>
                <div className="flex flex-wrap justify-end w-full sm:w-fit gap-2">
                    <SecondaryButton
                        isDisabled={isLoading}
                        doSomething={cancelAssessmentForm}
                        text={"Cancel"}
                    />

                    <div className="flex space-x-[2px]">
                        {assessmentDetails.assessment_type && (
                            <PrimaryButton
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                doSomething={handeSubmit}
                                text={
                                    assessmentDetails.status === "published"
                                        ? "Publish"
                                        : "Save as draft"
                                }
                            />
                        )}

                        {/* Dropdown button */}
                        {(isEdit ||
                            assessmentDetails.assessment_type ===
                                "activity") && (
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
                                            statusChange("status", "published")
                                        }
                                    >
                                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                            Publish
                                        </a>
                                    </li>
                                    <li
                                        onClick={() =>
                                            statusChange("status", "draft")
                                        }
                                    >
                                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                            Save as draft
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Form buttons End*/}
        </form>
    );
}
