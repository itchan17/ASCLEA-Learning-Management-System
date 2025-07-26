import { create } from "zustand";
import useCreateQuizStore from "./createQuizStore";
import useUserStore from "../../User/userStore";
import useModulesStore from "./modulesStore";

const useAssessmentsStore = create((set) => ({
    isFormOpen: false,

    assessmentDetails: {
        id: null,
        sectionId: null,
        sortOrder: null,
        contentType: "assessment",
        assessmentStatus: null,
        assessmentType: "",
        assessmentDueDateTime: "",
        assessmentPoints: 0,
        assessmentTitle: "",
        assessmentDescription: "",
        assessmentFiles: [],
        assessmentQuiz: null,
        assessmentPostDate: "",
        userPosted: "",
        responseReceived: 0,
    },

    assessmentList: [
        {
            id: 1,
            sectionId: 1,
            sortOrder: 2,
            contentType: "assessment",
            assessmentType: "quiz",
            assessmentDueDateTime: "2025-07-15T23:59",
            assessmentPoints: 100,
            assessmentTitle: "Chapter 3 Quiz: Photosynthesis",
            assessmentDescription:
                "<h2>This quiz will cover all topics in Chapter 3, including light-dependent and light-independent reactions. Please review all diagrams and key concepts.</h2>",
            assessmentFiles: [],
            assessmentQuiz: {
                id: 1,
                quizTitle: "First quiz",
                quizDescription: "",
            },
            assessmentPostDate: "2025-07-07",
            userPosted: "John Doe",
            responseReceived: 3,
        },
        {
            id: 2,
            sectionId: 2,
            sortOrder: 1,
            contentType: "assessment",
            assessmentType: "activity",
            assessmentDueDateTime: "2025-07-20T23:59",
            assessmentPoints: 50,
            assessmentTitle: "Lab Activity: Plant Cell Observation",
            assessmentDescription: `
                                        <h2>Instructions:</h2>
                                        <ol>
                                            <li>Obtain the prepared slides of plant cells from your instructor.</li>
                                            <li>Set up the microscope and carefully observe the slides.</li>
                                            <li>Draw and label the visible parts of the plant cells.</li>
                                            <li>Complete the observation sheet provided.</li>
                                            <li>Submit both the labeled diagram and the observation sheet before the deadline.</li>
                                        </ol>
                                    `,
            assessmentFiles: [],
            assessmentQuiz: null,
            assessmentPostDate: "2025-07-08",
            userPosted: "Jane Smith",
            responseReceived: 5,
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

    hanndleAddAssessments: (sectionId) => {
        const user = useUserStore.getState().user;
        const { assessmentDetails, assessmentList, clearAssessmentDetails } =
            useAssessmentsStore.getState();

        const today = new Date().toISOString().slice(0, 10);

        // temporarily  set the id
        const newId =
            assessmentList.length > 0
                ? assessmentList[assessmentList.length - 1].id + 1
                : 1;

        if (sectionId) {
            const sectionList = useModulesStore.getState().sectionList;

            console.log(sectionList);
            const sectionDetails = sectionList.find(
                (section) => section.id === sectionId
            );

            const contentList = sectionDetails.sectionContentList;
            const lastItem = contentList[contentList.length - 1];

            const sortOrder = lastItem ? lastItem.sortOrder + 1 : 1;

            const updatedAssessmentDetails = {
                ...assessmentDetails,
                id: newId, // temporarily set the id
                sectionId,
                sortOrder,
                assessmentPostDate: today,
                userPosted: `${user.firstName} ${user.lastName}`,
            };
            console.log(updatedAssessmentDetails);
            set({
                assessmentList: [updatedAssessmentDetails, ...assessmentList],
            });
        } else {
            const updatedAssessmentDetails = {
                ...assessmentDetails,
                id: newId, // temporarily set the id
                assessmentPostDate: today,
                userPosted: `${user.firstName} ${user.lastName}`,
            };
            console.log(updatedAssessmentDetails);
            set({
                assessmentList: [updatedAssessmentDetails, ...assessmentList],
            });
        }

        clearAssessmentDetails();
    },
}));

export default useAssessmentsStore;
