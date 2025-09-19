import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import useAssessmentsStore from "../../../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import ActivityReponses from "./Components/ActivityReponses";
import QuizResponses from "./Components/QuizResponses";
import BackButton from "../../../../../../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../../../../../../Utils/handleClickBackBtn";
import PrimaryButton from "../../../../../../../../Components/Button/PrimaryButton";
import { IoCaretDownOutline } from "react-icons/io5";

export default function ViewResponses({ programId, courseId, assessment }) {
    console.log(programId);
    console.log(courseId);
    console.log(assessment);
    // // Assessment store
    // const assessmentList = useAssessmentsStore((state) => state.assessmentList);

    // const [assessmentDetails, setAssessmentDetails] = useState(null);

    // // get the id from url
    // const { assessmentId } = usePage().props;
    // // temporarily get the data of slected assessment
    // useEffect(() => {
    //     // check if id is true
    //     if (assessmentId) {
    //         // find the assessment details in asssessment list based on the id in url
    //         // this in temporary only as there's currently data passed from backend
    //         // the data will come from the backend and here's we're it will be set
    //         const details = assessmentList.find(
    //             (detail) => detail.id === Number(assessmentId)
    //         );

    //         // set the data
    //         setAssessmentDetails(details);
    //     }
    // }, []);

    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="flex flex-wrap items-center justify-between">
                <BackButton doSomething={handleClickBackBtn} />

                {/* Download button */}
                <div className="flex space-x-[0.5px]">
                    <PrimaryButton text="Download" />

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
                            className="text-size2 dropdown-content menu space-y-2 font-bold bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Download as pdf
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Download as csv
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Display responses here */}
            {assessment &&
                (assessment.assessment_type.assessment_type === "quiz" ? (
                    <QuizResponses />
                ) : assessmentDetails.assessmentType === "activity" ? (
                    <ActivityReponses responsesData={assessmentDetails} />
                ) : null)}
        </div>
    );
}
