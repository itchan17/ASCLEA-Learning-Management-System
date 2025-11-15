import { use } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const usePostStore = create((set) => ({
    postByCourse: {},

    setPosts: (courseId, list, page, hasMore) => {
        const { postByCourse } = usePostStore.getState();

        // Check if the list for the course if it does mix the previous list to new ones
        const postList = postByCourse[courseId]
            ? [...postByCourse[courseId].list, ...list]
            : [...list];

        // Map handle removing duplicate values based on the assessment id
        const uniquePostts = [
            ...new Map(postList.map((post) => [post.post_id, post])).values(),
        ];

        set(() => ({
            postByCourse: {
                ...postByCourse,
                [courseId]: {
                    list: uniquePostts,
                    page,
                    hasMore,
                },
            },
        }));
    },

    addNewPost: (newPost, courseId) => {
        const { postByCourse } = usePostStore.getState();

        const courseState = postByCourse[courseId] || {
            list: [],
            page: 1,
            hasMore: true,
        };

        set({
            postByCourse: {
                ...postByCourse,
                [courseId]: {
                    ...courseState,
                    list: [newPost, ...courseState.list],
                },
            },
        });
    },

    // Upddate the popsst list wwhen a post was updated
    updatePostList: (updatedPost, courseId) => {
        const { postByCourse } = usePostStore.getState();

        const courseState = postByCourse[courseId];

        const updatedCoursePostList = courseState.list.map((post) =>
            post.post_id === updatedPost.post_id ? updatedPost : post
        );

        set({
            postByCourse: {
                ...postByCourse,
                [courseId]: {
                    ...courseState,
                    list: updatedCoursePostList,
                },
            },
        });
    },
}));

export default usePostStore;
