import { create } from "zustand";

const useAssessmentsStore = create((set) => ({
    assessmentDetails: {
        assessmentType: "",
        assessmentDueDate: "",
        assessmentDuration: "",
        assessmentPoints: "",
        assessmentTitle: "",
        assessmentDescription: "",
        assessmentFiles: [],
    },

    handleAssessmentChange: (field, value) => {
        const { assessmentDetails } = useAssessmentsStore.getState();

        // Check if the field is assessmentFiles then add the new files in the array
        if (field === "assessmentFiles" && Array.isArray(value)) {
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
                assessmentFiles: assessmentDetails.assessmentFiles.filter(
                    (file, index) => index !== fileId
                ),
            },
        });
    },

    clearAssessmentDetails: () => {
        set({
            assessmentDetails: {
                assessmentType: "",
                assessmentDueDate: "",
                assessmentDuration: "",
                assessmentPoints: "",
                assessmentTitle: "",
                assessmentDescription: "",
                assessmentFiles: [],
            },
        });
    },
}));

export default useAssessmentsStore;
