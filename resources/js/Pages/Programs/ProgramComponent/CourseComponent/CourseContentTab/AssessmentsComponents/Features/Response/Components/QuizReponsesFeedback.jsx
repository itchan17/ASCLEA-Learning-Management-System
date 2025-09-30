import React from "react";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import { RiFeedbackFill } from "react-icons/ri";

export default function QuizReponsesFeedback() {
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
                    icon={<RiFeedbackFill />}
                    text={"Generate Feedback"}
                />
            </div>
            <div className="space-y-2">
                <h1 className="text-size3 break-words font-semibold">
                    Performance Analysis
                </h1>
                <p className="text-justify">
                    The class performed well overall, achieving an average score
                    of 88%. Time spent was consistent at 2.5 hours, suggesting
                    that most students worked through the exam at a steady pace.
                    The score range—from 98/150 (65%) to 125/150 (83%)—indicates
                    moderate variation in mastery. However, several commonly
                    missed questions pointed to conceptual gaps. Notably,
                    students struggled to distinguish between subjective and
                    objective assessments, often misidentifying tools like
                    concept mapping as objective when they are typically used
                    for exploratory or reflective tasks. There was also frequent
                    confusion between instructional approaches—especially
                    differentiating between reflective and inquiry-based
                    methods.
                </p>
            </div>
            <div className="space-y-2">
                <h1 className="text-size3 break-words font-semibold">
                    Suggestions
                </h1>
                <p className="text-justify">
                    To improve conceptual clarity, conduct targeted reviews
                    focused on assessment types and pedagogical frameworks. Use
                    side-by-side comparison charts to contrast reflective,
                    inquiry-based, and constructivist approaches. Reinforce
                    assessment method distinctions with scenario-based quizzes
                    and group activities. For example, ask students to match
                    classroom situations to appropriate teaching strategies or
                    assessment tools. Additionally, providing exemplars of
                    objective (e.g., matching, multiple-choice) vs. subjective
                    (e.g., essays, portfolios) formats can help clarify
                    misunderstandings. These strategies will reinforce key
                    concepts and better prepare students for practical
                    application.
                </p>
            </div>
        </div>
    );
}
