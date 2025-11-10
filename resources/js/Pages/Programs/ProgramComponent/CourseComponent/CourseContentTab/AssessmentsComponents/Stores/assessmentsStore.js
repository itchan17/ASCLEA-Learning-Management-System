import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAssessmentsStore = create(
    persist(
        (set) => ({
            assessmentByCourse: {},

            setAssessments: (courseId, list, page, hasMore) => {
                const { assessmentByCourse } = useAssessmentsStore.getState();

                // Check if the list for the course if it does mix the previous list to new ones
                const assessmentList = assessmentByCourse[courseId]
                    ? [...assessmentByCourse[courseId].list, ...list]
                    : [...list];

                // Map handle removing duplicate values based on the assessment id
                const uniqueAssessments = [
                    ...new Map(
                        assessmentList.map((a) => [a.assessment_id, a])
                    ).values(),
                ];

                set(() => ({
                    assessmentByCourse: {
                        ...assessmentByCourse,
                        [courseId]: {
                            list: uniqueAssessments,
                            page,
                            hasMore,
                        },
                    },
                }));
            },

            addNewAssessment: (newAssessment, courseId) => {
                const { assessmentByCourse } = useAssessmentsStore.getState();

                const courseState = assessmentByCourse[courseId] || {
                    list: [],
                    page: 1,
                    hasMore: true,
                };

                set({
                    assessmentByCourse: {
                        ...assessmentByCourse,
                        [courseId]: {
                            ...courseState,
                            list: [newAssessment, ...courseState.list],
                        },
                    },
                });
            },

            updateAssessmentInList: (updatedAssessment, courseId) => {
                const { assessmentByCourse } = useAssessmentsStore.getState();

                const courseState = assessmentByCourse[courseId];

                const updatedAssessmentList = courseState.list.map(
                    (assessment) =>
                        assessment.assessment_id ===
                        updatedAssessment.assessment_id
                            ? updatedAssessment
                            : assessment
                );

                set({
                    assessmentByCourse: {
                        ...assessmentByCourse,
                        [courseId]: {
                            ...courseState,
                            list: updatedAssessmentList,
                        },
                    },
                });
            },
        }),
        { name: "assessment-store" }
    )
);

export default useAssessmentsStore;
