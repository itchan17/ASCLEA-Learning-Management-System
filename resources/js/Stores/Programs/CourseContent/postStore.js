import { create } from "zustand";

const usePostStore = create((set) => ({
    postList: [],
    postDetails: {
        postTitle: "",
        postDescription: "",
    },

    handlePostChange: (field, value) => {
        const { postDetails } = usePostStore.getState();

        set({ postDetails: { ...postDetails, [field]: value } });
    },

    clearPostDetails: () => {
        set({
            postDetails: {
                postTitle: "",
                postDescription: "",
            },
        });
    },

    handleAddPost: () => {
        const { postDetails, postValue, postList, clearPostDetails } =
            usePostStore.getState();

        set({ postList: [postDetails, ...postList] });
        clearPostDetails();
    },
}));

export default usePostStore;
