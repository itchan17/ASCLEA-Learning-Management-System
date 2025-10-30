import { useEffect, useCallback, useRef } from "react";
import useModulesStore from "../Stores/modulesStore";
import MaterialItem from "./MaterialItem";
import { usePage } from "@inertiajs/react";
import EmptyState from "../../../../../../../Components/EmptyState/EmptyState";
import Loader from "../../../../../../../Components/Loader";
import useMaterial from "../Hooks/useMaterial";

export default function MaterialList({ setIsMaterialFormOpen }) {
    const { program, course } = usePage().props;

    // Module store
    const materialsByCourse = useModulesStore(
        (state) => state.materialsByCourse
    );

    // Custom hooks
    const { isLoading, handleFetchMaterials } = useMaterial({
        programId: program.program_id,
        courseId: course.course_id,
    });

    const loaderRef = useRef(null);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];

            if (target.isIntersecting && !isLoading) {
                handleFetchMaterials();
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
        <div className="space-y-5">
            {/* Dropdown for material list */}
            {materialsByCourse[course.course_id] &&
                materialsByCourse[course.course_id].list.length > 0 && (
                    <div className="flex flex-col space-y-5">
                        {materialsByCourse[course.course_id].list.map(
                            (material) => (
                                <MaterialItem
                                    key={material.material_id}
                                    materialDetails={material}
                                    setIsMaterialFormOpen={
                                        setIsMaterialFormOpen
                                    }
                                />
                            )
                        )}
                    </div>
                )}

            {(!materialsByCourse[course.course_id] ||
                materialsByCourse[course.course_id].hasMore) && (
                <div ref={loaderRef} className=" w-full flex justify-center">
                    <Loader color="bg-ascend-blue" />
                </div>
            )}

            {materialsByCourse[course.course_id] &&
                materialsByCourse[course.course_id].list.length === 0 &&
                !materialsByCourse[course.course_id].hasMore && (
                    <EmptyState
                        imgSrc={"/images/illustrations/empty.svg"}
                        text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                    />
                )}
        </div>
    );
}
