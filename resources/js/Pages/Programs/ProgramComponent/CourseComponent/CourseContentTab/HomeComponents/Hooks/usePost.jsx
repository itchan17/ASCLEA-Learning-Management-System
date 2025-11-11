import { useState, useEffect } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import usePostStore from "../Stores/postStore";
import DefaultCustomToast from "../../../../../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../../../../../Utils/displayToast";

export default function usePost({ programId, courseId }) {
    // Post Store
    // const postDetails = usePostStore((state) => state.postDetails);
    const postByCourse = usePostStore((state) => state.postByCourse);
    const setPosts = usePostStore((state) => state.setPosts);
    const addNewPost = usePostStore((state) => state.addNewPost);
    const updatePostList = usePostStore((state) => state.updatePostList);

    // Local states
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleCreateUpdatePost = async (
        setIsPostFormOpen,
        postDetails,
        isEdit = false,
        postId = null
    ) => {
        try {
            setIsLoading(true);
            let response;

            if (isEdit && postId) {
                response = await axios.put(
                    route("post.update", {
                        program: programId,
                        course: courseId,
                        post: postId,
                    }),
                    postDetails
                );

                updatePostList(response.data.data, courseId);
            } else {
                response = await axios.post(
                    route("post.create", {
                        program: programId,
                        course: courseId,
                    }),
                    postDetails
                );

                addNewPost(response.data.data, courseId);
            }

            setIsPostFormOpen(false);
            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            if (error.response?.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                displayToast(
                    <DefaultCustomToast
                        message={"Something went wrong. Please try again."}
                    />,
                    "error"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchPosts = async () => {
        try {
            setIsLoading(true);
            let response;
            let pageNum;
            let postList;

            if (!postByCourse[courseId]) {
                response = await axios.get(
                    route("posts.get", {
                        program: programId,
                        course: courseId,
                        _query: {
                            page: 1,
                        },
                    })
                );

                pageNum = 2;
            } else {
                response = await axios.get(
                    route("posts.get", {
                        program: programId,
                        course: courseId,
                        _query: {
                            page: postByCourse[courseId].page,
                        },
                    })
                );

                pageNum = postByCourse[courseId].page + 1;
            }

            postList = response.data.data;

            const hasMoreAssessment =
                response.data.current_page < response.data.last_page;

            setPosts(courseId, postList, pageNum, hasMoreAssessment);
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please reload the page."}
                />,
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnpublishPost = async (postId) => {
        try {
            console.log(programId);
            const response = await axios.put(
                route("post.unpublish", {
                    program: programId,
                    course: courseId,
                    post: postId,
                })
            );
            updatePostList(response.data.data, courseId);
            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again."}
                />,
                "error"
            );
        }
    };

    const handleArchivePost = async (postId) => {
        try {
            console.log(programId);
            const response = await axios.delete(
                route("post.archive", {
                    program: programId,
                    course: courseId,
                    post: postId,
                })
            );
            updatePostList(response.data.data, courseId);
            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again."}
                />,
                "error"
            );
        }
    };

    const handleRestorePost = async (postId) => {
        try {
            console.log(programId);
            const response = await axios.put(
                route("post.restore", {
                    program: programId,
                    course: courseId,
                    post: postId,
                })
            );
            updatePostList(response.data.data, courseId);
            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again."}
                />,
                "error"
            );
        }
    };

    return {
        handleCreateUpdatePost,
        isLoading,
        errors,
        handleFetchPosts,
        handleUnpublishPost,
        handleArchivePost,
        handleRestorePost,
    };
}
