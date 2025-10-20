import { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import useQuizStore from "../../Stores/quizStore";
import { displayToast } from "../../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../../Components/CustomToast/DefaultCustomToast";
import { updateQuestion } from "../Services/questionService";

export default function useQuestionAutoSave({ assessmentId, quizId }) {
    // Store
    const setIsFormSaving = useQuizStore((state) => state.setIsFormSaving);
    const setSavedLabel = useQuizStore((state) => state.setSavedLabel);

    const debounceUpdateQuestion = useCallback(
        debounce(async (questionDetails) => {
            try {
                setIsFormSaving(true);
                await updateQuestion({
                    assessmentId,
                    quizId,
                    questionId: questionDetails.question_id,
                    questionDetails,
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
        [updateQuestion, setIsFormSaving, setSavedLabel]
    );

    useEffect(() => {
        return () => {
            debounceUpdateQuestion.cancel();
        };
    }, [debounceUpdateQuestion]);

    return { debounceUpdateQuestion };
}
