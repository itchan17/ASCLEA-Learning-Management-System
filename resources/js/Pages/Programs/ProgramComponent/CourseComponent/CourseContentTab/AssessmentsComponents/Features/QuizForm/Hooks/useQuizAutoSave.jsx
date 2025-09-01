import { useCallback } from "react";
import { debounce } from "lodash";
import saveQuizDetails from "../Services/quizService";
import useQuizStore from "../Stores/quizStore";
import { displayToast } from "../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useQuizAutosave({ assessmentId, quizId }) {
    // Store
    const setIsFormSaving = useQuizStore((state) => state.setIsFormSaving);
    const setSavedLabel = useQuizStore((state) => state.setSavedLabel);

    // A debounced function that handles auto save
    // used useCallback to prevent recreating of the function
    const debounceAutoSave = useCallback(
        debounce(async (quizDetails) => {
            try {
                setIsFormSaving(true);
                console.log(quizDetails);
                await saveQuizDetails(assessmentId, quizId, quizDetails);

                // Used to display the label in navbar
                // this truly indicates the the changes was saved
                // instead of using a text in conditional statement in the navbar
                // which causes an unwanted behaviour
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
        [assessmentId, quizId]
    );

    return { debounceAutoSave };
}
