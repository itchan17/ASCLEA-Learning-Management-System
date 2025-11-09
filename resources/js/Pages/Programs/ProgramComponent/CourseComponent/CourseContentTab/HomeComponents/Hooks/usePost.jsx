import { useState, useEffect } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import usePostStore from "../Stores/postStore";
import DefaultCustomToast from "../../../../../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../../../../../Utils/displayToast";

export default function usePost({ programId, courseId }) {
    // Post Store
    const postDetails = usePostStore((state) => state.postDetails);

    // Local states
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleCreatePost = async (setIsPostFormOpen) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                route("post.create", { program: programId, course: courseId }),
                postDetails
            );

            console.log(response);
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

    useEffect(() => {
        console.log(postDetails);
    }, [postDetails]);
    return { handleCreatePost, isLoading, errors };
}
