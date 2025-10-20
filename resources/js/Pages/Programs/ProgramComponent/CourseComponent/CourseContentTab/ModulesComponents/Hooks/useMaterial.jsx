import { useState, useEffect } from "react";
import { route } from "ziggy-js";
import axios from "axios";
import { displayToast } from "../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../Components/CustomToast/DefaultCustomToast";
import useModulesStore from "../Stores/modulesStore";

export default function useMaterial({ programId, courseId }) {
    // Module store
    const materialDetails = useModulesStore((state) => state.materialDetails);
    const addNewMaterial = useModulesStore((state) => state.addNewMaterial);
    const materialsByCourse = useModulesStore(
        (state) => state.materialsByCourse
    );
    const setMaterials = useModulesStore((state) => state.setMaterials);
    const updateMaterialList = useModulesStore(
        (state) => state.updateMaterialList
    );

    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const appendToFormData = (assessmentFormData) => {
        // Append data into FormData to enbale uploading files
        for (let key in materialDetails) {
            const value = materialDetails[key];

            // Skips appending data with null value
            // Make sure data is nullable in backend valdiation
            if (value === null || value === undefined) {
                continue;
            }

            // Append array values
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    assessmentFormData.append(`${key}[${i}]`, v);
                });
            } else {
                assessmentFormData.append(key, value);
            }
        }
    };

    const handleAddUpdateMaterial = async (
        setIsMaterialFormOpen,
        isEdit = false,
        materialId = null
    ) => {
        setIsLoading(true);
        setErrors(null);
        const materialFormData = new FormData();
        appendToFormData(materialFormData);

        try {
            let response;
            if (!isEdit && !materialId) {
                response = await axios.post(
                    route("material.add", {
                        program: programId,
                        course: courseId,
                    }),
                    materialFormData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                addNewMaterial(response.data.data, courseId);
            } else {
                materialFormData.append("_method", "PUT");
                response = await axios.post(
                    route("material.update", {
                        program: programId,
                        course: courseId,
                        material: materialId,
                    }),
                    materialFormData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                updateMaterialList(response.data.data, courseId);
            }
            setIsMaterialFormOpen(false);
            displayToast(
                <DefaultCustomToast message={response.data.success} />,
                "success"
            );
        } catch (error) {
            console.error(error);
            // Check for value in response.data.errors
            // This is where the valdiation errors located
            // So we have to set it in the state that will display error
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

    const handleUnpublishMaterial = async (materialId) => {
        try {
            const response = await axios.put(
                route("material.unpublish", {
                    program: programId,
                    course: courseId,
                    material: materialId,
                })
            );

            updateMaterialList(response.data.data, courseId);
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

    return {
        errors,
        isLoading,
        handleAddUpdateMaterial,
        handleFetchMaterials,
        handleUnpublishMaterial,
    };
}
