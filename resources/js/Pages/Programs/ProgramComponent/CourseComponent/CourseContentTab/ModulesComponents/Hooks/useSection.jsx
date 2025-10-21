import { useState } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import useModulesStore from "../Stores/modulesStore";
import { displayToast } from "../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useSection({ programId, courseId }) {
    // Module store
    const sectionDetails = useModulesStore((state) => state.sectionDetails);
    const clearSectionDetails = useModulesStore(
        (state) => state.clearSectionDetails
    );

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleAddSection = async (setIsSectionFormOpen) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                route("section.add", { program: programId, course: courseId }),
                sectionDetails
            );
            console.log(response);
            setIsSectionFormOpen(false);
            clearSectionDetails();
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
    return { isLoading, errors, handleAddSection };
}
