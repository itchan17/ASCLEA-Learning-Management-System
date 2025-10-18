import { useState, useEffect } from "react";
import { route } from "ziggy-js";
import axios from "axios";
import { displayToast } from "../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../Components/CustomToast/DefaultCustomToast";
import useModulesStore from "../Stores/modulesStore";

export default function useMaterialForm({ programId, courseId }) {
    // Module store
    const addNewMaterial = useModulesStore((state) => state.addNewMaterial);

    const [materialDetails, setMaterialDetails] = useState({
        material_title: "",
        material_description: null,
        status: "published",
        material_files: [],
        removed_files: [],
    });
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMaterialDetailsChange = (field, value) => {
        if (field === "material_files" && Array.isArray(value)) {
            setMaterialDetails((prev) => ({
                ...prev,
                material_files: [...prev.material_files, ...value],
            }));
        } else {
            setMaterialDetails((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleRemoveAttachedFiles = (fileIndex) => {
        setMaterialDetails((prev) => ({
            ...prev,
            material_files: prev.material_files.filter(
                (file, index) => index != fileIndex
            ),
        }));
    };

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

    const handleAddMaterial = async (setIsMaterialFormOpen) => {
        setIsLoading(true);
        setErrors(null);
        const materialFormData = new FormData();
        appendToFormData(materialFormData);

        try {
            const reponse = await axios.post(
                route("material.add", { program: programId, course: courseId }),
                materialFormData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            addNewMaterial(reponse.data.data, courseId);
            setIsMaterialFormOpen(false);
            displayToast(
                <DefaultCustomToast message={reponse.data.success} />,
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

    useEffect(() => {
        console.log(materialDetails);
    }, [materialDetails]);

    return {
        materialDetails,
        handleMaterialDetailsChange,
        handleRemoveAttachedFiles,
        errors,
        isLoading,
        handleAddMaterial,
    };
}
