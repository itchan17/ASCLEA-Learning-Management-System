import { useCallback } from "react";
import { debounce } from "lodash";
import useQuizStore from "../../Stores/quizStore";
import { displayToast } from "../../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../../Components/CustomToast/DefaultCustomToast";
import useQuestionService from "../Services/useQuestionService";

export default function useQuestionAutoSave({ assessmentId, quizId }) {
    // Store
    const setIsFormSaving = useQuizStore((state) => state.setIsFormSaving);
    const setSavedLabel = useQuizStore((state) => state.setSavedLabel);

    // Custom hook
    const { updateQuestion } = useQuestionService({ assessmentId, quizId });

    const debounceUpdateQuestion = useCallback(
        debounce(async (questionDetails) => {
            try {
                setIsFormSaving(true);
                await updateQuestion(
                    questionDetails.question_id,
                    questionDetails
                );

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
        []
    );

    return { debounceUpdateQuestion };
}
