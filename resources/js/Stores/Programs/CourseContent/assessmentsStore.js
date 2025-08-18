import { create } from "zustand";
import useCreateQuizStore from "./createQuizStore";
import useUserStore from "../../User/userStore";
import useModulesStore from "./modulesStore";

const useAssessmentsStore = create((set) => ({
    isFormOpen: false,

    // Helps for identifying which assessmtn to edit
    // If assessment has the same id set to this
    // The card will be hide and the form will be displayed
    // If user click other assessment to edit assessment card will be shwon again
    assessmentIdToEdit: null,
    setAssessmentIdToEdit: (assessmentId) => {
        set({ assessmentIdToEdit: assessmentId });
    },

    assessmentDetails: {
        assessment_title: "",
        assessment_description: null,
        status: "published",
        assessment_type: "",
        due_datetime: "",
        total_points: 0,
        assessment_files: [],
        removed_files: [],
        // sectionId: null,
        // sortOrder: null,
        // contentType: "assessment",
        // assessmentQuiz: null,
        // responseReceived: 0,
    },

    // Set the data of assessment thaw will be use to edit
    setAssessmentDetails: (dataToEdit) => {
        // Manually set because of nested objects
        set({
            assessmentDetails: {
                assessment_title: dataToEdit.assessment_title,
                assessment_description: dataToEdit.assessment_description,
                status: dataToEdit.status,
                assessment_type: dataToEdit.assessment_type.assessment_type,
                due_datetime: dataToEdit.due_datetime,
                total_points: dataToEdit.total_points,
                assessment_files: [],
                uploaded_files: dataToEdit.files,
                removed_files: [],
            },
        });
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
                assessment_files: assessmentDetails.assessment_files.filter(
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
                removed_files: [...assessmentDetails.removed_files, fileId],
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
