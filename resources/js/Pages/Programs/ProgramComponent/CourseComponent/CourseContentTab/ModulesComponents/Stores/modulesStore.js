import { create } from "zustand";
import useAssessmentsStore from "../../../../../../../Stores/Programs/CourseContent/assessmentsStore";

const useModulesStore = create((set) => ({
    activeTab: "materials",

    setActiveTab: (tab) => {
        set({
            activeTab: tab,
        });
    },

    // Material

    materialDetails: {
        material_title: "",
        material_description: null,
        status: "published",
        material_files: [],
        removed_files: [],
    },
    materialsByCourse: [],

    handleMaterialDetailsChange: (field, value) => {
        const { materialDetails } = useModulesStore.getState();

        if (field === "material_files" && Array.isArray(value)) {
            set({
                materialDetails: {
                    ...materialDetails,
                    material_files: [
                        ...materialDetails.material_files,
                        ...value,
                    ],
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

    handleRemoveAttachedFiles: (fileIndex) => {
        const { materialDetails } = useModulesStore.getState();

        set({
            materialDetails: {
                ...materialDetails,
                material_files: materialDetails.material_files.filter(
                    (file, index) => index != fileIndex
                ),
            },
        });
    },

    setMaterialDetails: (materialDetailsToEdit) => {
        set({
            materialDetails: {
                material_title: materialDetailsToEdit.material_title,
                material_description:
                    materialDetailsToEdit.material_description,
                status: materialDetailsToEdit.status,
                uploaded_files: materialDetailsToEdit.material_files, // Set the upaloded files
                material_files: [],
                removed_files: [],
            },
        });
    },

    handlelRemoveUploadedFile: (fileId) => {
        const { materialDetails } = useModulesStore.getState();

        set({
            materialDetails: {
                ...materialDetails,
                uploaded_files: materialDetails.uploaded_files.filter(
                    (file) => file.material_file_id !== fileId
                ),
                removed_files: [...materialDetails.removed_files, fileId],
            },
        });
    },

    setMaterials: (courseId, list, page, hasMore) => {
        const { materialsByCourse } = useModulesStore.getState();

        // Check if the list for the course if it does mix the previous list to new ones
        const materialList = materialsByCourse[courseId]
            ? [...materialsByCourse[courseId].list, ...list]
            : [...list];

        // Map handle removing duplicate values based on the  id
        const uniqueMaterials = [
            ...new Map(materialList.map((a) => [a.material_id, a])).values(),
        ];

        set(() => ({
            materialsByCourse: {
                ...materialsByCourse,
                [courseId]: {
                    list: uniqueMaterials,
                    page,
                    hasMore,
                },
            },
        }));
    },

    addNewMaterial: (newMaterial, courseId) => {
        const { materialsByCourse } = useModulesStore.getState();

        // Check if  a list already exist
        const courseState = materialsByCourse[courseId] || {
            list: [],
            page: 1,
            hasMore: true,
        };

        set({
            materialsByCourse: {
                ...materialsByCourse,
                [courseId]: {
                    ...courseState,
                    list: [newMaterial, ...courseState.list],
                },
            },
        });
    },

    updateMaterialList: (updatedMaterial, courseId) => {
        const { materialsByCourse } = useModulesStore.getState();

        const courseState = materialsByCourse[courseId];

        const updatedCourseMaterialList = courseState.list.map((material) =>
            material.material_id === updatedMaterial.material_id
                ? updatedMaterial
                : material
        );

        set({
            materialsByCourse: {
                ...materialsByCourse,
                [courseId]: {
                    ...courseState,
                    list: updatedCourseMaterialList,
                },
            },
        });
    },

    clearMaterialDetails: () => {
        set({
            materialDetails: {
                material_title: "",
                material_description: null,
                status: "published",
                material_files: [],
                removed_files: [],
            },
        });
    },

    // Section
    sectionDetails: {
        section_title: "",
        status: "draft",
    },

    sectionsByCourse: [],

    setSectionDetails: (sectionDetails) => {
        set({
            sectionDetails: { section_title: sectionDetails.section_title },
        });
    },

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
                section_title: "",
                status: "draft",
            },
        });
    },

    setSections: (courseId, list, page, hasMore) => {
        const { sectionsByCourse } = useModulesStore.getState();

        // Check if the list for the course exist, if it does mix the previous list to new ones
        const sectionList = sectionsByCourse[courseId]
            ? [...sectionsByCourse[courseId].list, ...list]
            : [...list];

        // Map handle removing duplicate values based on the  id
        const uniqueMaterials = [
            ...new Map(sectionList.map((a) => [a.section_id, a])).values(),
        ];

        set(() => ({
            sectionsByCourse: {
                ...sectionsByCourse,
                [courseId]: {
                    list: uniqueMaterials,
                    page,
                    hasMore,
                },
            },
        }));
    },

    addNewSection: (newSection, courseId) => {
        const { sectionsByCourse } = useModulesStore.getState();

        // Check if  a list already exist
        const courseState = sectionsByCourse[courseId] || {
            list: [],
            page: 1,
            hasMore: true,
        };

        set({
            sectionsByCourse: {
                ...sectionsByCourse,
                [courseId]: {
                    ...courseState,
                    list: [newSection, ...courseState.list],
                },
            },
        });
    },

    updateSectionList: (updatedSection, courseId) => {
        const { sectionsByCourse } = useModulesStore.getState();

        const courseState = sectionsByCourse[courseId];

        const updatedCourseSectionList = courseState.list.map((section) =>
            section.section_id === updatedSection.section_id
                ? updatedSection
                : section
        );

        set({
            sectionsByCourse: {
                ...sectionsByCourse,
                [courseId]: {
                    ...courseState,
                    list: updatedCourseSectionList,
                },
            },
        });
    },

    // Section items

    // For settting the whole items in the section
    setSectionItems: (courseId, sectionId, sectionItems) => {
        const { sectionsByCourse } = useModulesStore.getState();

        const courseState = sectionsByCourse[courseId] || {
            list: [],
            page: 1,
            hasMore: true,
        };

        const updatedList = courseState.list.map((section) => {
            if (section.section_id === sectionId) {
                return {
                    ...section,
                    items: sectionItems,
                };
            }
            return section;
        });

        set({
            sectionsByCourse: {
                ...sectionsByCourse,
                [courseId]: {
                    ...courseState,
                    list: updatedList,
                },
            },
        });
    },

    // For adding item in the secction items
    addNewSectionItem: (newSectionItem, courseId, sectionId) => {
        const { sectionsByCourse } = useModulesStore.getState();

        const courseState = sectionsByCourse[courseId] || {
            list: [],
            page: 1,
            hasMore: true,
        };

        // Update the item list of the section
        const updatedList = courseState.list.map((section) => {
            if (section.section_id === sectionId) {
                return {
                    ...section,
                    items: [...(section.items || []), newSectionItem],
                };
            }
            return section;
        });
        console.log(updatedList);
        set({
            sectionsByCourse: {
                ...sectionsByCourse,
                [courseId]: {
                    ...courseState,
                    list: updatedList,
                },
            },
        });
    },

    // For updadting the item in section items
    updateSectionItems: (updatedSectionItem, courseId, sectionId) => {
        const { sectionsByCourse } = useModulesStore.getState();
        console.log(updatedSectionItem);
        const courseState = sectionsByCourse[courseId] || {
            list: [],
            page: 1,
            hasMore: true,
        };

        // Update the item list of the section
        const updatedList = courseState.list.map((section) => {
            if (section.section_id === sectionId) {
                const updatedSectionItems = section.items.map((i) =>
                    i.section_item_id === updatedSectionItem.section_item_id
                        ? updatedSectionItem
                        : i
                );

                return {
                    ...section,
                    items: updatedSectionItems,
                };
            }
            return section;
        });

        set({
            sectionsByCourse: {
                ...sectionsByCourse,
                [courseId]: {
                    ...courseState,
                    list: updatedList,
                },
            },
        });
    },
}));

export default useModulesStore;
