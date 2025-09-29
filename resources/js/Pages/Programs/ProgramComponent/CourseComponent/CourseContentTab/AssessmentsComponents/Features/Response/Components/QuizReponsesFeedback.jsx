import { useState } from "react";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import { RiFeedbackFill } from "react-icons/ri";
import axios from "axios";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/react";

export default function QuizReponsesFeedback() {
    const { programId, courseId, assessment } = usePage().props;

    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const handleGenerateFeedback = async () => {
        setIsloading(true);
        try {
            const response = await axios.post(
                route("generate.quiz.responses.feedback", {
                    program: programId,
                    course: courseId,
                    assessment: assessment.assessment_id,
                })
            );
            setFeedback(response.data.feedback);
            console.log(response);
        } catch (error) {
        } finally {
            setIsloading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap gap-5 items-center justify-between">
                <div className="flex items-end space-x-3">
                    <h1 className="text-size5 break-words font-semibold">
                        Feedback
                    </h1>
                    <span className="text-size3 text-ascend-gray3 mb-[2px]">
                        AI Generated
                    </span>
                </div>
                <PrimaryButton
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    doSomething={handleGenerateFeedback}
                    icon={<RiFeedbackFill />}
                    text={"Generate Feedback"}
                />
            </div>
            <div className="space-y-2">
                <h1 className="text-size3 break-words font-semibold">
                    Performance Summary
                </h1>
                <p className="text-justify">
                    {feedback ? feedback.performance_summary : ""}
                </p>
            </div>
            <div className="space-y-2">
                <h1 className="text-size3 break-words font-semibold">
                    Performance Analysis
                </h1>
                <p className="text-justify">
                    {feedback ? feedback.performance_analysis : ""}
                </p>
            </div>
            <div className="space-y-2">
                <h1 className="text-size3 break-words font-semibold">
                    Suggestions
                </h1>

                <ol className="list-decimal ml-5">
                    {feedback &&
                        feedback.suggestions.length > 0 &&
                        feedback.suggestions.map((suggestion) => (
                            <li>{suggestion}</li>
                        ))}
                </ol>
            </div>
        </div>
    );
}
