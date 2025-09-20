import { useState, useEffect } from "react";
import usePeopleStore from "../../../../../../../../../Stores/Programs/peopleStore";
import { IoSearch } from "react-icons/io5";
import BackButton from "../../../../../../../../../Components/Button/BackButton";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import { handleClickBackBtn } from "../../../../../../../../../Utils/handleClickBackBtn";
import { IoCaretDownOutline } from "react-icons/io5";
import { Pie } from "react-chartjs-2";
import { RiFeedbackFill } from "react-icons/ri";
import StudentQuizDetails from "./StudentQuizDetails";
import ViewEvidence from "./ViewEvidence";
import { calcPercentage } from "../../../../../../../../../Utils/calcPercentage";
import { convertDurationMinutes } from "../../../../../../../../../Utils/convertDurationMinutes";
import { usePage } from "@inertiajs/react";
import EmptyState from "../../../../../../../../../Components/EmptyState/EmptyState";
import Pagination from "../../../../../../../../../Components/Pagination";
import useSearchSortQuizResponses from "../Hooks/useSearchSortQuizResponses";
import { BiSortUp } from "react-icons/bi";
import { FaSort } from "react-icons/fa";

export default function QuizReponses() {
    const {
        programId,
        courseId,
        assessment,
        summary,
        frequentlyMissedQuestions,
        responses,
    } = usePage().props;

    // Custom hook
    const {
        debouncedSearch,
        handleSortScore,
        sortScore,
        handleSortTime,
        sortTime,
    } = useSearchSortQuizResponses({
        programId,
        courseId,
        assessmentId: assessment.assessment_id,
    });

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [numOfQuestionToDisplay, setnumOfQuestionToDisplay] = useState(5);
    const [
        frequentlyMissedQuestionsWithColors,
        setFrequentlyMissedQuestionsWithColors,
    ] = useState(null);

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    }

    useEffect(() => {
        if (frequentlyMissedQuestions.length > 0) {
            setFrequentlyMissedQuestionsWithColors(
                frequentlyMissedQuestions.map((question) => {
                    return { ...question, color: getRandomColor() };
                })
            );
        }
    }, []);

    const handleClickSeeMore = () => {
        if (!isSeeMore) {
            setnumOfQuestionToDisplay(frequentlyMissedQuestions.length);
        } else {
            setnumOfQuestionToDisplay(5);
        }
        setIsSeeMore(!isSeeMore);
    };

    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="w-full min-w-0">
                <h1 className="text-size6 break-words font-semibold">
                    {assessment.assessment_title}
                </h1>
                <div className="space-x-5">
                    <span className="font-medium">
                        {/* Possible Points: {assessment.assessmentPoints} */}
                        Total Points: {assessment.quiz.quiz_total_points}
                    </span>
                    <span className="font-medium">
                        {/* Response Received: {responsesData.responseReceived} */}
                        Responses Received:{" "}
                        {assessment.assessment_submissions_count}
                    </span>
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-5">
                <h1 className="text-size5 break-words font-semibold">
                    Summary
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                {summary.average_score}
                            </h1>
                            <span className="text-size4 text-ascend-gray2">
                                {calcPercentage(
                                    summary.average_score,
                                    assessment.quiz.quiz_total_points
                                )}
                                %
                            </span>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Average Score
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                {
                                    convertDurationMinutes(summary.average_time)
                                        .formattedTime
                                }
                            </h1>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Average TIme
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                {`${summary.highest_score}/${assessment.quiz.quiz_total_points}`}
                            </h1>
                        </div>

                        <span className="text-size4 text-ascend-gray2">
                            {calcPercentage(
                                summary.highest_score,
                                assessment.quiz.quiz_total_points
                            )}
                            %
                        </span>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Highest Score
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                        <div className="w-full min-w-0">
                            <h1 className="text-size7 break-words text-ascend-black">
                                {`${summary.highest_score}/${assessment.quiz.quiz_total_points}`}
                            </h1>
                        </div>

                        <span className="text-size4 text-ascend-gray2">
                            {calcPercentage(
                                summary.lowest_score,
                                assessment.quiz.quiz_total_points
                            )}
                            %
                        </span>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-ascend-black">
                                Lowest Score
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frequently Missed Questions */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-size5 break-words font-semibold">
                        Frequently Missed Questions
                    </h1>
                    {frequentlyMissedQuestions.length > 0 && (
                        <span
                            onClick={handleClickSeeMore}
                            className="cursor-pointer hover:text-ascend-blue transition-all duration-300 text-nowrap hover:underline"
                        >
                            {!isSeeMore ? "See more" : "See less"}
                        </span>
                    )}
                </div>

                {frequentlyMissedQuestions.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex justify-center col-span-1 lg:p-10">
                            <Pie
                                data={{
                                    labels: frequentlyMissedQuestionsWithColors?.map(
                                        (question) =>
                                            `Question no. ${question.question_number}`
                                    ),
                                    datasets: [
                                        {
                                            data: frequentlyMissedQuestionsWithColors?.map(
                                                (question) =>
                                                    question.missed_rate
                                            ),
                                            backgroundColor:
                                                frequentlyMissedQuestionsWithColors?.map(
                                                    (question) => question.color
                                                ),
                                            extra: frequentlyMissedQuestionsWithColors?.map(
                                                (q) => q.missed_count
                                            ),
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    const dataset =
                                                        context.dataset;
                                                    let missedRate =
                                                        context.raw;
                                                    const missedCount =
                                                        dataset.extra[
                                                            context.dataIndex
                                                        ];

                                                    return [
                                                        `Missed Rate: ${missedRate}%`,
                                                        `Missed Count: ${missedCount}`,
                                                    ];
                                                },
                                            },
                                        },
                                    },
                                }}
                            ></Pie>
                        </div>

                        <ol className="md:col-span-1 lg:col-span-2 space-y-5 flex flex-col items-start max-h-[600px] overflow-y-auto ">
                            {frequentlyMissedQuestionsWithColors &&
                                frequentlyMissedQuestionsWithColors
                                    ?.slice(0, numOfQuestionToDisplay)
                                    .map((missedQuestion) => (
                                        <li className="space-y-2">
                                            <div className="flex flex-col items-start space-x-4 w-full">
                                                <div className="flex items-center space-x-4 w-full mb-2">
                                                    <div
                                                        className={` w-5 h-5 shrink-0`}
                                                        style={{
                                                            backgroundColor:
                                                                missedQuestion.color,
                                                        }}
                                                    ></div>
                                                    <p className="text-gray-700 text-nowrap font-bold">
                                                        Question no.{" "}
                                                        {
                                                            missedQuestion.question_number
                                                        }
                                                        :
                                                    </p>
                                                </div>

                                                <p className="text-gray-700">
                                                    {missedQuestion.question}
                                                </p>
                                            </div>
                                            <div className="flex w-fit space-x-4">
                                                <div className="flex items-start space-x-1 w-full">
                                                    <p className="text-gray-700 text-nowrap font-bold">
                                                        Missed Rate:
                                                    </p>

                                                    <p className="text-gray-700">
                                                        {
                                                            missedQuestion.missed_rate
                                                        }
                                                        %
                                                    </p>
                                                </div>
                                                <div className="flex items-start space-x-1 w-full">
                                                    <p className="text-gray-700 text-nowrap font-bold">
                                                        Missed Count:
                                                    </p>

                                                    <p className="text-gray-700">
                                                        {
                                                            missedQuestion.missed_count
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                        </ol>
                    </div>
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/empty.svg"}
                        text={`“No responses have been submitted for this quiz yet.”`}
                    />
                )}
            </div>
            {/* Feedback */}
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
                        The class performed well overall, achieving an average
                        score of 88%. Time spent was consistent at 2.5 hours,
                        suggesting that most students worked through the exam at
                        a steady pace. The score range—from 98/150 (65%) to
                        125/150 (83%)—indicates moderate variation in mastery.
                        However, several commonly missed questions pointed to
                        conceptual gaps. Notably, students struggled to
                        distinguish between subjective and objective
                        assessments, often misidentifying tools like concept
                        mapping as objective when they are typically used for
                        exploratory or reflective tasks. There was also frequent
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
                        focused on assessment types and pedagogical frameworks.
                        Use side-by-side comparison charts to contrast
                        reflective, inquiry-based, and constructivist
                        approaches. Reinforce assessment method distinctions
                        with scenario-based quizzes and group activities. For
                        example, ask students to match classroom situations to
                        appropriate teaching strategies or assessment tools.
                        Additionally, providing exemplars of objective (e.g.,
                        matching, multiple-choice) vs. subjective (e.g., essays,
                        portfolios) formats can help clarify misunderstandings.
                        These strategies will reinforce key concepts and better
                        prepare students for practical application.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="flex flex-wrap gap-5 items-center justify-between">
                <div className="min-w-0">
                    <h1 className="text-size5 break-words font-semibold">
                        Student Scores
                    </h1>
                </div>
                <div className="relative">
                    <input
                        className="w-full sm:w-50 border pl-10 pr-3 py-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search name"
                        onChange={debouncedSearch}
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="border-b-2 border-ascend-gray3">
                            <th className="text-ascend-black font-black">
                                Name
                            </th>
                            <th className="text-ascend-black font-black">
                                <div
                                    onClick={handleSortTime}
                                    className="flex space-x-1 items-center hover:bg-ascend-lightblue transition-all duration-300 w-fit p-2 cursor-pointer"
                                >
                                    <p>Time</p>
                                    {!sortTime ? (
                                        <span className="text-size4 ">
                                            <FaSort />
                                        </span>
                                    ) : (
                                        <span
                                            className={`text-size4 ${
                                                sortTime && sortTime === "desc"
                                                    ? "transform scale-y-[-1]"
                                                    : ""
                                            } transition-all duration-300`}
                                        >
                                            <BiSortUp />
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th className="text-ascend-black font-black ">
                                <div
                                    onClick={handleSortScore}
                                    className="flex space-x-1 items-center hover:bg-ascend-lightblue transition-all duration-300 w-fit p-2 cursor-pointer"
                                >
                                    <p>Score</p>
                                    {!sortScore ? (
                                        <span className="text-size4 ">
                                            <FaSort />
                                        </span>
                                    ) : (
                                        <span
                                            className={`text-size4 ${
                                                sortScore &&
                                                sortScore === "desc"
                                                    ? "transform scale-y-[-1]"
                                                    : ""
                                            } transition-all duration-300`}
                                        >
                                            <BiSortUp />
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th className="text-ascend-black font-black">
                                Warnings
                            </th>
                            <th className="text-ascend-black font-black"></th>
                        </tr>
                    </thead>
                    {responses.data.length > 0 && (
                        <tbody>
                            {responses.data.map((response) => (
                                <tr
                                    onClick={() => {
                                        setIsDetailsOpen(true);
                                    }}
                                    key={response.assessment_submission_id}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl shrink-0"></div>

                                            <div className="font-bold">
                                                {`${response.submitted_by.first_name} ${response.submitted_by.last_name}`}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            convertDurationMinutes(
                                                response.time_spent
                                            ).formattedTime
                                        }
                                    </td>
                                    <td>
                                        {response.score}/
                                        {assessment.quiz.quiz_total_points}
                                    </td>
                                    <td className="text-ascend-red">6</td>
                                    <td>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEvidenceOpen(true);
                                            }}
                                            className="hover:text-ascend-blue underline"
                                        >
                                            View detection results
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {responses.data.length > 0 && responses.total > 10 && (
                <Pagination
                    links={responses.links}
                    currentPage={responses.current_page}
                    lastPage={responses.last_page}
                    only={["responses"]}
                />
            )}

            {isDetailsOpen && (
                <StudentQuizDetails setIsDetailsOpen={setIsDetailsOpen} />
            )}

            {isEvidenceOpen && (
                <ViewEvidence setIsEvidenceOpen={setIsEvidenceOpen} />
            )}
        </div>
    );
}
