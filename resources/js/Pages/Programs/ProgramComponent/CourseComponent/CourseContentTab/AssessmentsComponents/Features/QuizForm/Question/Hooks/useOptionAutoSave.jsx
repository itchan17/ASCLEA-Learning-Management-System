import { useCallback, useEffect } from "react";
import { updateOption } from "../Services/optionService";
import { debounce } from "lodash";

export default function useOptionAutoSave({
    assessmentId,
    quizId,
    questionId,
}) {
    const debounceUpdateOption = useCallback(
        debounce(async (updatedOptionDetails) => {
            try {
                await updateOption({
                    assessmentId,
                    quizId,
                    questionId,
                    optionId: updatedOptionDetails.question_option_id,
                    updatedOptionDetails,
                });
            } catch (error) {
                console.error(error);
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
