import { create } from "zustand";

const usePostStore = create((set) => ({
    postList: [],
    postDetails: {
        postTitle: "",
        postDescription: "",
    },
    postValue: "",

    handlePostValueChange: (value) => {
        const { postValue } = usePostStore.getState();

        set({ postValue: value });
    },

    handlePostTitleChange: (field, value) => {
        const { postDetails } = usePostStore.getState();

        set({ postDetails: { ...postDetails, [field]: value } });
    },

    clearPostDetails: () => {
        const { postValue, postDetails } = usePostStore.getState();
        set({
            postValue: "",
            postDetails: {
                postTitle: "",
                postDescription: "",
            },
        });
    },

    handleAddPost: () => {
        const { postDetails, postValue, postList, clearPostDetails } =
            usePostStore.getState();

        const updatedPostDetails = {
            ...postDetails,
            postDescription: postValue,
        };
        set({ postList: [updatedPostDetails, ...postList] });
        clearPostDetails();
    },
}));

export default usePostStore;
