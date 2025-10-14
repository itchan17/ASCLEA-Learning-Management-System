import React from "react";
import useSearchSortResponses from "../Hooks/useSearchSortResponses";
import { IoSearch } from "react-icons/io5";
import { BiSortUp } from "react-icons/bi";
import { FaSort } from "react-icons/fa";
import { convertDurationMinutes } from "../../../../../../../../../Utils/convertDurationMinutes";
import Pagination from "../../../../../../../../../Components/Pagination";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { cleanDecimal } from "../../../../../../../../../Utils/cleanDecimal";

export default function QuizResponsesTable({
    programId,
    courseId,
    assessment,
    responses,
}) {
    const {
        debouncedSearch,
        handleSortScore,
        sortScore,
        handleSortTime,
        sortTime,
    } = useSearchSortResponses({
        programId,
        courseId,
        assessmentId: assessment.assessment_id,
    });

    const handleViewStudentQuizResult = (assessmentSubmissionId) => {
        router.visit(
            route("quizzes.quiz.result", {
                course: courseId,
                assessment: assessment.assessment_id,
                quiz: assessment.quiz.quiz_id,
                assessmentSubmission: assessmentSubmissionId,
            })
        );
    };

    return (
        <>
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
                                    onClick={() =>
                                        handleViewStudentQuizResult(
                                            response.assessment_submission_id
                                        )
                                    }
                                    key={response.assessment_submission_id}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    response.submitted_by
                                                        .profile_image &&
                                                    `/storage/${response.submitted_by.profile_image}`
                                                }
                                                alt="Profile image"
                                                className="w-12 h-12 bg-ascend-gray1/20 rounded-4xl shrink-0"
                                            ></img>

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
                                        {cleanDecimal(response.score)}/
                                        {assessment.quiz.quiz_total_points}
                                    </td>
                                    <td className="text-ascend-red">6</td>
                                    {/* <td>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEvidenceOpen(true);
                                            }}
                                            className="hover:text-ascend-blue underline"
                                        >
                                            View detection results
                                        </span>
                                    </td> */}
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
        </>
    );
}
