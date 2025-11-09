import { use } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const usePostStore = create(
    persist(
        (set) => ({
            postDetails: {
                post_title: "",
                post_description: null,
                status: "published",
            },

            handlePostDetailsChange: (field, value) => {
                const { postDetails } = usePostStore.getState();

                set({
                    postDetails: {
                        ...postDetails,
                        [field]: value,
                    },
                });
            },

            clearPostDetails: () => {
                set({
                    postDetails: {
                        post_title: "",
                        post_description: null,
                        status: "published",
                    },
                });
            },
        }),
        { name: "post-store" }
    )
);

export default usePostStore;
