import { create } from "zustand";
import useAssessmentsStore from "../../../../../../../Stores/Programs/CourseContent/assessmentsStore";

const useModulesStore = create((set) => ({
    materialList: [
        {
            id: 1,
            sectionId: 1,
            sortOrder: 1,
            contentType: "material",
            materialTitle: "Chapter 1: Introduction to Physics",
            materialDescription:
                "<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>",
            materialFiles: [],
        },
        {
            id: 2,
            sectionId: 2,
            sortOrder: 2,
            contentType: "material",
            materialTitle: "Lesson: Newton's Laws of Motion",
            materialDescription:
                "<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>",
            materialFiles: [],
        },
    ],

    sectionList: [
        {
            id: 1,
            sectionTitle: "1st Week",
            sectionStatus: "published",
            sectionContentList: [
                {
                    id: 1,
                    sectionId: 1,
                    sortOrder: 1,
                    contentType: "material",
                    materialTitle: "Chapter 1: Introduction to Physics",
                    materialDescription:
                        "<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>",
                    materialFiles: [],
                },
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
            ],
        },
        {
            id: 2,
            sectionTitle: "Week 2",
            sectionStatus: "unpublish",
            sectionContentList: [
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
                {
                    id: 2,
                    sectionId: 2,
                    sortOrder: 2,
                    contentType: "material",
                    materialTitle: "Lesson: Newton's Laws of Motion",
                    materialDescription:
                        "<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>",
                    materialFiles: [],
                },
            ],
        },
    ],

    materialDetails: {
        id: null,
        sectionId: null,
        sortOrder: null,
        contentType: "material",
        materialTitle: "",
        materialDescription: "",
        materialFiles: [],
    },

    sectionDetails: {
        id: null,
        sectionTitle: "",
        status: "unpublish",
        sectionContentList: [],
    },

    handleMaterialChange: (field, value) => {
        const { materialDetails } = useModulesStore.getState();

        // Check if the field is materialFiles then add the new files in the array
        if (field === "materialFiles" && Array.isArray(value)) {
            set({
                materialDetails: {
                    ...materialDetails,
                    [field]: [...materialDetails[field], ...value],
                },
            });
        } else {
            set({
                materialDetails: {
                    ...materialDetails,
                    [field]: value,
                },
            });
        }
    },

    // Add the new material in the material list
    handleAddMaterials: (sectionId) => {
        const {
            materialDetails,
            materialList,
            clearMaterialForm,
            sectionList,
        } = useModulesStore.getState();

        console.log(materialDetails);
        // temporarily  set the id
        const newId =
            materialList.length > 0
                ? materialList[materialList.length - 1].id + 1
                : 1;

        if (sectionId) {
            console.log("Creatign on section");
            // Set the sort order based on the sectionContentList of the selected section
            const secDetails = sectionList.find(
                (section) => section.id === sectionId
            );

            // clone the sectionContentList
            const contentList = secDetails.sectionContentList;

            // find the index of last section content
            const lastItem = contentList[contentList.length - 1];

            // Add the 1 based on order of last section content
            const sortOrder = lastItem ? lastItem.sortOrder + 1 : 1;

            const updatedMaterialDetails = {
                ...materialDetails,
                id: newId,
                sectionId,
                sortOrder,
            };

            set({ materialList: [updatedMaterialDetails, ...materialList] });
        } else {
            const updatedMaterialDetails = { ...materialDetails, id: newId };

            set({ materialList: [updatedMaterialDetails, ...materialList] });
        }
        clearMaterialForm();
    },

    // Remove the attached files based on the id
    removeAttachedFile: (fileId) => {
        const { materialDetails } = useModulesStore.getState();
        set({
            materialDetails: {
                ...materialDetails,
                materialFiles: materialDetails.materialFiles.filter(
                    (file, index) => index !== fileId
                ),
            },
        });
    },

    // Clear the form
    clearMaterialForm: () => {
        set({
            materialDetails: {
                materialTitle: "",
                materialDescription: "",
                materialFiles: [],
            },
        });
    },

    // Functions for module section
    handleSectionDetailsChange: (field, value) => {
        const { sectionDetails } = useModulesStore.getState();
        set({
            sectionDetails: {
                ...sectionDetails,
                [field]: value,
            },
        });
    },

    clearSectionDetails: () => {
        set({
            sectionDetails: {
                sectionTitle: "",
            },
        });
    },

    handleAddSection: () => {
        const { sectionDetails, sectionList, clearSectionDetails } =
            useModulesStore.getState();

        // temporarily set the id
        const newId =
            sectionList.length > 0
                ? sectionList[sectionList.length - 1].id + 1
                : 1;

        // clone the object
        const updatedSectionDetails = { ...sectionDetails, id: newId };
        set({
            sectionList: [...sectionList, updatedSectionDetails],
        });

        clearSectionDetails();
    },

    updateSectionStatus: (sectionId, status) => {
        const { sectionList } = useModulesStore.getState();

        const sectionIndex = sectionList.findIndex(
            (section) => section.id === sectionId
        );

        const updatedSection = {
            ...sectionList[sectionIndex],
            sectionStatus: status,
        };

        const updatedList = [...sectionList];
        updatedList[sectionIndex] = updatedSection;

        set({ sectionList: updatedList });
    },

    // getSectionContentList: (sectionId) => {
    //     const { materialList } = useModulesStore.getState();
    //     const assessmentList = useAssessmentsStore.getState().assessmentList;

    //     const assessments = assessmentList.filter(
    //         (assessment) => assessment.sectionId === sectionId
    //     );

    //     const materials = materialList.filter(
    //         (material) => material.sectionId === sectionId
    //     );

    //     const sectionContentList = [...assessments, ...materials];
    //     sectionContentList.sort((a, b) => a.key - b.key);

    //     set
    // },
}));

export default useModulesStore;
