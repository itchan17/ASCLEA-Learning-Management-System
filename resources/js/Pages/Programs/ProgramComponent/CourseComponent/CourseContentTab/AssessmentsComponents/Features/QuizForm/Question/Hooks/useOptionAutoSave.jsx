import { useCallback, useEffect } from "react";
import { updateOption } from "../Services/optionService";
import { debounce } from "lodash";
import useQuizStore from "../../Stores/quizStore";
import { displayToast } from "../../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useOptionAutoSave({
    assessmentId,
    quizId,
    questionId,
}) {
    // Quiz store
    const setIsFormSaving = useQuizStore((state) => state.setIsFormSaving);
    const setSavedLabel = useQuizStore((state) => state.setSavedLabel);

    const debounceUpdateOption = useCallback(
        debounce(async (updatedOptionDetails) => {
            try {
                setIsFormSaving(true);
                await updateOption({
                    assessmentId,
                    quizId,
                    questionId,
                    optionId: updatedOptionDetails.question_option_id,
                    updatedOptionDetails,
                });
                setSavedLabel("Changes saved");
            } catch (error) {
                console.error(error);
                displayToast(
                    <DefaultCustomToast
                        message={"Something went wrong. Please try again."}
                    />,
                    "error"
                );
            } finally {
                setIsFormSaving(false);
            }
        }, 300),
        [assessmentId, quizId, questionId]
    );

    useEffect(() => {
        return () => {
            debounceUpdateOption.cancel();
        };
    }, [debounceUpdateOption]);

    return { debounceUpdateOption };
}
