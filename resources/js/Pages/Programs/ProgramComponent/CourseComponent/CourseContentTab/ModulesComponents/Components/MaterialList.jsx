import React, { useEffect, useCallback, useRef, useMemo } from "react";
import useModulesStore from "../Stores/modulesStore";
import MaterialItem from "./MaterialItem";
import EmptyState from "../../../../../../../Components/EmptyState/EmptyState";
import Loader from "../../../../../../../Components/Loader";
import useMaterial from "../Hooks/useMaterial";
import { shallow } from "zustand/shallow";

function MaterialList({ setIsMaterialFormOpen, programId, courseId }) {
    // Module store
    const materialsByCourse = useModulesStore(
        (state) => state.materialsByCourse,
        shallow
    );

    const courseMaterials = useMemo(() => {
        return materialsByCourse[courseId] || { list: [], hasMore: true };
    }, [materialsByCourse, courseId]);

    // Custom hooks
    const { isLoading, handleFetchMaterials } = useMaterial({
        programId,
        courseId,
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
        <div>
            {/* Dropdown for material list */}
            {courseMaterials &&
                courseMaterials.list.length > 0 &&
                courseMaterials.list.map((material) => (
                    <MaterialItem
                        key={material.material_id}
                        materialDetails={material}
                        setIsMaterialFormOpen={setIsMaterialFormOpen}
                    />
                ))}

            {(!courseMaterials || courseMaterials.hasMore) && (
                <div
                    ref={loaderRef}
                    className=" w-full flex justify-center mt-5"
                >
                    <Loader color="bg-ascend-blue" />
                </div>
            )}

            {courseMaterials &&
                courseMaterials.list.length === 0 &&
                !courseMaterials.hasMore && (
                    <EmptyState
                        imgSrc={"/images/illustrations/empty.svg"}
                        text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                    />
                )}
        </div>
    );
}

export default React.memo(MaterialList);
