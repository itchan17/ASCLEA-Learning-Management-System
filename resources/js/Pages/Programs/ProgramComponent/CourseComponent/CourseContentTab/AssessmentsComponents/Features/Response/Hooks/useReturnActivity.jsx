import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useReturnActivity({
    courseId,
    assessmentId,
    responses,
}) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedSubmittedActivities, setSelectedSubmittedActivities] =
        useState([]);
    const [unselectedSubmittedActivities, setUnselectedSubmittedActivities] =
        useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedSubmittedActivities(
                responses.data.map(
                    (response) => response.assessment_submission_id
                )
            );
        } else {
            setSelectedSubmittedActivities([]);
            setUnselectedSubmittedActivities([]);
        }
    };

    const handleSelectSubmittedActivity = (assessemntSubmissionId) => {
        console.log("CLICK CHECK");
        // Add and remove user 1 by 1
        const updatedSubmittedActivities = selectedSubmittedActivities.some(
            (id) => id === assessemntSubmissionId
        ) // Check if the id is allready in the list
            ? selectedSubmittedActivities.filter(
                  (id) => id !== assessemntSubmissionId
              ) // If true filter the list by removing the duplicated id
            : [...selectedSubmittedActivities, assessemntSubmissionId]; // If false add the id to the list

        setSelectedSubmittedActivities(updatedSubmittedActivities);

        // For unselecting
        if (selectAll) {
            // Add the unselected users
            const updatedUnselectedSubmitteedActivities =
                unselectedSubmittedActivities.some(
                    (id) => id === assessemntSubmissionId
                )
                    ? unselectedSubmittedActivities.filter(
                          (id) => id !== assessemntSubmissionId
                      )
                    : [
                          ...unselectedSubmittedActivities,
                          assessemntSubmissionId,
                      ];

            if (updatedSubmittedActivities.length > 0) {
                setUnselectedSubmittedActivities(
                    updatedUnselectedSubmitteedActivities
                );
            } else {
                // Reset state if theres no updatedSubmittedActivities
                // This means user clicked select all then unchecked all the user
                setSelectAll(false);
                setUnselectedSubmittedActivities([]);
            }
        }
    };

    useEffect(() => {
        if (selectAll) {
            setSelectedSubmittedActivities(
                responses.data.map(
                    (response) => response.assessment_submission_id
                )
            );
        }
    }, [responses]);

    const handlePostGrades = () => {
        setIsLoading(true);
        router.put(
            route("return.activity", {
                course: courseId,
                assessment: assessmentId,
            }),
            {
                selectAll,
                selectedSubmittedActivities,
                unselectedSubmittedActivities,
            },
            {
                preserveScroll: true,
                showProgress: false,
                only: [
                    "responses",
                    "gradedResponsesCount",
                    "returnedResponsesCount",
                ],
                onSuccess: () => {
                    setSelectAll(false);
                    setSelectedSubmittedActivities([]);
                    setUnselectedSubmittedActivities([]);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return {
        selectedSubmittedActivities,
        selectAll,
        handleSelectAll,
        handleSelectSubmittedActivity,
        handlePostGrades,
        isLoading,
    };
}
