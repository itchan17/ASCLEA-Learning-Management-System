import { use } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const usePostStore = create((set) => ({
    postDetails: {
        post_title: "",
        post_description: null,
        status: "published",
    },

    postByCourse: {},

    handlePostDetailsChange: (field, value) => {
        const { postDetails } = usePostStore.getState();

        set({
            postDetails: {
                ...postDetails,
                [field]: value,
            },
        });
    },

    setAssessments: (courseId, list, page, hasMore) => {
        const { assessmentByCourse } = useAssessmentsStore.getState();

        // Check if the list for the course if it does mix the previous list to new ones
        const assessmentList = assessmentByCourse[courseId]
            ? [...assessmentByCourse[courseId].list, ...list]
            : [...list];

        // Map handle removing duplicate values based on the assessment id
        const uniqueAssessments = [
            ...new Map(
                assessmentList.map((a) => [a.assessment_id, a])
            ).values(),
        ];

        set(() => ({
            assessmentByCourse: {
                ...assessmentByCourse,
                [courseId]: {
                    list: uniqueAssessments,
                    page,
                    hasMore,
                },
            },
        }));
    },

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

    clearPostDetails: () => {
        set({
            postDetails: {
                post_title: "",
                post_description: null,
                status: "published",
            },
        });
    },
}));

export default usePostStore;
