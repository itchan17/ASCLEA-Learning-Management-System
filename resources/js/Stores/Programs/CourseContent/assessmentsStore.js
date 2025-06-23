import { create } from "zustand";

const useAssessmentsStore = create((set) => ({
    isFormOpen: false,

    assessmentDetails: {
        assessmentType: "",
        assessmentDueDate: "",
        assessmentDuration: "",
        assessmentPoints: "",
        assessmentTitle: "",
        assessmentDescription: "",
        assessmentFiles: [],
    },

    assessmentList: [],

    toggleAssessmentForm: () => {
        const { isFormOpen } = useAssessmentsStore.getState();
        set({ isFormOpen: !isFormOpen });
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

    hanndleAddAssessments: () => {
        const { assessmentDetails, assessmentList, clearAssessmentDetails } =
            useAssessmentsStore.getState();

        console.log(assessmentDetails);

        set({ assessmentList: [assessmentDetails, ...assessmentList] });
        clearAssessmentDetails();
    },
}));

export default useAssessmentsStore;
