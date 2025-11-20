import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import Post from "./Post";
import Loader from "../../../../../../../Components/Loader";
import { usePage } from "@inertiajs/react";
import usePostStore from "../Stores/postStore";
import EmptyState from "../../../../../../../Components/EmptyState/EmptyState";
import usePost from "../Hooks/usePost";

export default function PostList({ courseId, programId }) {
    // Post store
    const postByCourse = usePostStore((state) => state.postByCourse);

    // Custom hook
    const { isLoading, handleFetchPosts } = usePost({
        programId,
        courseId,
    });

    const loaderRef = useRef(null);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];

            if (target.isIntersecting && !isLoading) {
                handleFetchPosts();
            }
        },
        [isLoading]
    );

    useEffect(() => {
        // Create the observer function
        // Reset and re-create whenever there are changes in dependecies
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "100px",
            threshold: 0,
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            observer.disconnect();
        };
    }, [handleObserver]);

    return (
        <div>
            {/* <Loader color="text-ascend-blue" /> */}
            {postByCourse[courseId] &&
                postByCourse[courseId].list.length > 0 &&
                postByCourse[courseId].list.map((post) => (
                    <Post key={post.post_id} postContent={post} />
                ))}

            {(!postByCourse[courseId] || postByCourse[courseId].hasMore) && (
                <div
                    ref={loaderRef}
                    className=" w-full flex justify-center mt-5"
                >
                    <Loader color="bg-ascend-blue" />
                </div>
            )}

            {postByCourse[courseId] &&
                postByCourse[courseId].list.length === 0 &&
                !postByCourse[courseId].hasMore && (
                    <EmptyState
                        imgSrc={"/images/illustrations/empty.svg"}
                        text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                    />
                )}
        </div>
    );
}
