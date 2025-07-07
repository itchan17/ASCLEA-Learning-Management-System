import { create } from "zustand";
import useCreateQuizStore from "./createQuizStore";
import useUserStore from "../../User/userStore";

const useAssessmentsStore = create((set) => ({
    isFormOpen: false,

    assessmentDetails: {
        id: null,
        assessmentType: "",
        assessmentDueDateTime: "",
        assessmentDuration: 0,
        assessmentPoints: 0,
        assessmentTitle: "",
        assessmentDescription: "",
        assessmentFiles: [],
        assessmentQuiz: null,
        assessmentPostDate: "",
        userPosted: "",
    },

    assessmentList: [
        {
            id: 1,
            assessmentType: "quiz",
            assessmentDueDateTime: "2025-07-15T23:59",
            assessmentDuration: 30,
            assessmentPoints: 100,
            assessmentTitle: "Chapter 3 Quiz: Photosynthesis",
            assessmentDescription:
                "This quiz will cover all topics in Chapter 3, including light-dependent and light-independent reactions. Please review all diagrams and key concepts.",
            assessmentFiles: [],
            assessmentQuiz: {
                id: 1,
                quizTitle: "First quiz",
                quizDescription: "",
            },
            assessmentPostDate: "2025-07-07",
            userPosted: "John Doe",
        },
    ],

    // this handle creation of emty quiz form
    // the logic for creating empty form and saving it to database will be write here
    handleCreateIntialQuizForm: () => {
        const quizdetails = useCreateQuizStore.getState().quizDetails;
        const { handleAssessmentChange } = useAssessmentsStore.getState();

        // set inital id to 1
        quizdetails.id = 101;
        handleAssessmentChange("assessmentQuiz", quizdetails);
        console.log(quizdetails);
    },

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
        const user = useUserStore.getState().user;
        const { assessmentDetails, assessmentList, clearAssessmentDetails } =
            useAssessmentsStore.getState();

        const today = new Date().toISOString().slice(0, 10);
        const updatedAssessmentDetails = {
            ...assessmentDetails,
            id: 1, // temporarily set the id
            assessmentPostDate: today,
            userPosted: `${user.firstName} ${user.lastName}`,
        };
        console.log(updatedAssessmentDetails);
        set({ assessmentList: [updatedAssessmentDetails, ...assessmentList] });
        clearAssessmentDetails();
    },
}));

export default useAssessmentsStore;
