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
    const setSections = useModulesStore((state) => state.setSections);
    const addNewSection = useModulesStore((state) => state.addNewSection);
    const sectionsByCourse = useModulesStore((state) => state.sectionsByCourse);
    const updateSectionList = useModulesStore(
        (state) => state.updateSectionList
    );

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleAddUpdateSection = async (
        setIsSectionFormOpen,
        isEdit = false,
        sectionId = null
    ) => {
        setIsLoading(true);
        try {
            let response;
            if (!isEdit && !sectionId) {
                response = await axios.post(
                    route("section.add", {
                        program: programId,
                        course: courseId,
                    }),
                    sectionDetails
                );
                addNewSection(response.data.data, courseId);
            } else {
                response = await axios.put(
                    route("section.update", {
                        program: programId,
                        course: courseId,
                        section: sectionId,
                    }),
                    sectionDetails
                );
                updateSectionList(response.data.data, courseId);
            }
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

    const handleFetchSections = async () => {
        setIsLoading(true);
        try {
            let response;
            let pageNum;

            if (!sectionsByCourse[courseId]) {
                response = await axios.get(
                    route("sections.get", {
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
                    route("sections.get", {
                        program: programId,
                        course: courseId,
                        _query: {
                            page: sectionsByCourse[courseId].page,
                        },
                    })
                );

                pageNum = sectionsByCourse[courseId].page + 1;
            }

            const sectionList = response.data.data;

            const hasMoreAssessment =
                response.data.current_page < response.data.last_page;

            setSections(courseId, sectionList, pageNum, hasMoreAssessment);
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

    const handleUpdateSection = async (sectionId) => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                route("section.update", {
                    program: programId,
                    course: courseId,
                    section: sectionId,
                }),
                sectionDetails
            );

            console.log(response);
            updateSectionList(response.data.data, courseId);
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

    const handleUpdateSectionStatus = async (sectionId) => {
        try {
            const response = await axios.put(
                route("section.status.update", {
                    program: programId,
                    course: courseId,
                    section: sectionId,
                })
            );

            console.log(response);
            updateSectionList(response.data.data, courseId);
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

    const handleArchiveSection = async (sectionId) => {
        try {
            const response = await axios.delete(
                route("section.archive", {
                    program: programId,
                    course: courseId,
                    section: sectionId,
                })
            );

            console.log(response);
            updateSectionList(response.data.data, courseId);
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

    const handleRestoreSection = async (sectionId) => {
        try {
            const response = await axios.put(
                route("section.restore", {
                    program: programId,
                    course: courseId,
                    section: sectionId,
                })
            );

            console.log(response);
            updateSectionList(response.data.data, courseId);
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
        isLoading,
        errors,
        handleAddUpdateSection,
        handleFetchSections,
        handleUpdateSection,
        handleUpdateSectionStatus,
        handleArchiveSection,
        handleRestoreSection,
    };
}
