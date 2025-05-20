import { create } from "zustand";

const useMaterialsStore = create((set) => ({
    materialList: [],
    materialDetails: {
        materialTitle: "",
        materialDescription: "",
        materialFiles: null,
    },
    materialTextEditorValue: "",
    fileList: [],

    handleMaterialTitleChange: (field, value) => {
        const { materialDetails } = useMaterialsStore.getState();

        set({ materialDetails: { ...materialDetails, [field]: value } });
    },

    handleAddFiles: (newFiles) => {
        const { fileList } = useMaterialsStore.getState();

        set({ fileList: [...fileList, ...newFiles] });
    },

    handleMaterialTextEditorValue: (value) => {
        set({ materialTextEditorValue: value });
    },

    hanndleAddMaterials: () => {
        const {
            fileList,
            materialTextEditorValue,
            materialDetails,
            materialList,
            clearMaterialForm,
        } = useMaterialsStore.getState();

        const updatedMaterialDetails = {
            ...materialDetails,
            materialDescription: materialTextEditorValue,
            materialFiles: fileList,
        };

        console.log(updatedMaterialDetails);

        set({ materialList: { updatedMaterialDetails, ...materialList } });
        clearMaterialForm();
    },

    removeAttachedFile: (fileId) => {
        const { fileList } = useMaterialsStore.getState();
        set({ fileList: fileList.filter((file, index) => index !== fileId) });
    },

    clearMaterialForm: () => {
        set({
            materialDetails: {
                materialTitle: "",
                materialDescription: "",
                materialFiles: null,
            },
            materialTextEditorValue: "",
            fileList: [],
        });
    },
}));

export default useMaterialsStore;
