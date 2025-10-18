import { useEffect, useState, useCallback } from "react";
import { route } from "ziggy-js";
import axios from "axios";
import useModulesStore from "../Stores/modulesStore";
import { displayToast } from "../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useMaterialList({ programId, courseId }) {
    // Module store
    const materialsByCourse = useModulesStore(
        (state) => state.materialsByCourse
    );
    const setMaterials = useModulesStore((state) => state.setMaterials);

    const [isLoading, setIsLoading] = useState(false);

    const handleFetchMaterials = async () => {
        setIsLoading(true);
        try {
            let response;
            let pageNum;
            let materialList;

            if (!materialsByCourse[courseId]) {
                response = await axios.get(
                    route("materials.get", {
                        program: programId,
                        course: courseId,
                        _query: {
                            page: 1,
                        },
                    })
                );

                pageNum = 2;
                materialList = response.data.data;
            } else {
                response = await axios.get(
                    route("materials.get", {
                        program: programId,
                        course: courseId,
                        _query: {
                            page: materialsByCourse[courseId].page,
                        },
                    })
                );

                pageNum = materialsByCourse[courseId].page + 1;
                materialList = [
                    ...materialsByCourse[courseId].list,
                    ...response.data.data,
                ];
            }

            const hasMoreAssessment =
                response.data.current_page < response.data.last_page;

            setMaterials(courseId, materialList, pageNum, hasMoreAssessment);
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

    return { handleFetchMaterials, isLoading };
}
