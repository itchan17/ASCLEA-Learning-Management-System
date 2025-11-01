import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAssessmentsStore = create(
    persist(
        (set) => ({
            assessmentByCourse: {},
            assessmentDetails: {
                assessment_title: "",
                assessment_description: null,
                status: "published",
                assessment_type: "",
                due_datetime: "",
                total_points: 0,
                assessment_files: [],
                removed_files: [],
            },

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

            // Set the data of assessment thaw will be use to edit
            setAssessmentDetails: (dataToEdit) => {
                // Manually set because of nested objects
                set({
                    assessmentDetails: {
                        assessment_title: dataToEdit.assessment_title,
                        assessment_description:
                            dataToEdit.assessment_description,
                        status: dataToEdit.status,
                        assessment_type:
                            dataToEdit.assessment_type.assessment_type,
                        due_datetime: dataToEdit.due_datetime
                            ? new Date(dataToEdit.due_datetime)
                                  .toISOString()
                                  .slice(0, 16)
                            : null, // Converts time into format: Y-m-d\TH:i
                        total_points: dataToEdit.total_points,
                        assessment_files: [],
                        uploaded_files: dataToEdit.files,
                        removed_files: [],
                    },
                });
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

            handleAssessmentChange: (field, value) => {
                const { assessmentDetails } = useAssessmentsStore.getState();

                // Check if the field is assessmentFiles then add the new files in the array
                if (field === "assessment_files" && Array.isArray(value)) {
                    set({
                        assessmentDetails: {
                            ...assessmentDetails,
                            [field]: [...assessmentDetails[field], ...value],
                        },
                    });
                } else {
                    set({
                        assessmentDetails: {
                            ...assessmentDetails,
                            [field]: value,
                        },
                    });
                }
            },

            // Remove the attached files based on the id
            removeAttachedFile: (fileId) => {
                const { assessmentDetails } = useAssessmentsStore.getState();
                set({
                    assessmentDetails: {
                        ...assessmentDetails,
                        assessment_files:
                            assessmentDetails.assessment_files.filter(
                                (file, index) => index !== fileId
                            ),
                    },
                });
            },

            // This add the id of uploaded file into removed_files array
            removeUploadedFile: (fileId) => {
                const { assessmentDetails } = useAssessmentsStore.getState();

                set({
                    assessmentDetails: {
                        ...assessmentDetails,
                        uploaded_files: assessmentDetails.uploaded_files.filter(
                            (file) => file.assessment_file_id !== fileId
                        ),
                        removed_files: [
                            ...assessmentDetails.removed_files,
                            fileId,
                        ],
                    },
                });
            },

            clearAssessmentDetails: () => {
                set({
                    assessmentDetails: {
                        assessment_title: "",
                        assessment_description: null,
                        status: "published",
                        assessment_type: "",
                        due_datetime: "",
                        total_points: 0,
                        assessment_files: [],
                    },
                });
            },
        }),
        { name: "assessment-store" }
    )
);

export default useAssessmentsStore;
