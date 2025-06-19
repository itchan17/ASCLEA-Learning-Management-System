import { create } from "zustand";

const useMaterialsStore = create((set) => ({
    materialList: [],
    materialDetails: {
        materialTitle: "",
        materialDescription: "",
        materialFiles: [],
    },

    handleMaterialChange: (field, value) => {
        const { materialDetails } = useMaterialsStore.getState();

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
    hanndleAddMaterials: () => {
        const { materialDetails, materialList, clearMaterialForm } =
            useMaterialsStore.getState();

        console.log(materialDetails);

        set({ materialList: [materialDetails, ...materialList] });
        clearMaterialForm();
    },

    // Remove the attached files based on the id
    removeAttachedFile: (fileId) => {
        const { materialDetails } = useMaterialsStore.getState();
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
}));

export default useMaterialsStore;
