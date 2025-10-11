import React, { useState, useEffect } from "react";
import { cleanDecimal } from "../../../../../../../../../Utils/cleanDecimal";
import { capitalize } from "lodash";
import { formatDueDateTime } from "../../../../../../../../../Utils/formatDueDateTime";
import useGradeActivity from "../Hooks/useGradeActivity";

export default function ActivityResponseRow({
    courseId,
    response,
    assessment,
    selectedSubmittedActivities,
    handleSelectSubmittedActivity,
}) {
    // console.log(response);
    const { grade, gradeActivity, isLoading, isChanged } = useGradeActivity({
        courseId,
        assessmentId: assessment.assessment_id,
        assessemntSubmissionId: response.assessment_submission_id,
        initialGrade: response.score,
    });

    return (
        <tr
            key={response.assessment_submission_id}
            className="hover:bg-ascend-lightblue"
        >
            <td>
                <input
                    type="checkbox"
                    className="accent-ascend-blue w-4 h-4 cursor-pointer"
                    checked={selectedSubmittedActivities.some(
                        (id) => id === response.assessment_submission_id
                    )}
                    onChange={() =>
                        handleSelectSubmittedActivity(
                            response.assessment_submission_id
                        )
                    }
                />
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl shrink-0"></div>
                    <div className="font-bold">
                        {response.submitted_by.first_name}{" "}
                        {response.submitted_by.last_name}
                    </div>
                </div>
            </td>
            <td
                className={`${
                    response.submission_status === "submitted"
                        ? "text-ascend-yellow"
                        : response.submission_status === "graded"
                        ? "text-ascend-blue"
                        : response.submission_status === "returned"
                        ? "text-ascend-green"
                        : ""
                }`}
            >
                {capitalize(response.submission_status)}
            </td>
            <td>{formatDueDateTime(response.submitted_at)}</td>
            <td>
                <div className="space-x-2 flex flex-nowrap items-center">
                    <input
                        type="number"
                        className="w-12 h-8 p-2 border border-ascend-black focus:outline-ascend-blue appearance-none"
                        value={cleanDecimal(grade)}
                        onChange={gradeActivity}
                        // Prevent user from typing "-"
                        onKeyDown={(e) => {
                            if (e.key === "-") {
                                e.preventDefault();
                            }
                        }}
                    />
                    <span className="text-nowrap">
                        / {assessment.total_points}
                    </span>
                    {isChanged && (
                        <span className="text-nowrap ml-3">
                            {isLoading ? "Saving" : "Saved"}
                        </span>
                    )}
                </div>
            </td>
        </tr>
    );
}
