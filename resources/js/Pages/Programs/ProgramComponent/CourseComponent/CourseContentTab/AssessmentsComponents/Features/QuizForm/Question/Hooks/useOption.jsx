import { useState } from "react";
import useQuestionStore from "../Stores/questionStore";
import { addOption, deleteOption } from "../Services/optionService";
import useOptionAutoSave from "./useOptionAutoSave";
import useQuizStore from "../../Stores/quizStore";
import { displayToast } from "../../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useOption({ assessmentId, quizId, questionId }) {
    // Local states
    const [optionToEdit, setOptionToEdit] = useState(null);

    // Quiz store
    const setIsFormSaving = useQuizStore((state) => state.setIsFormSaving);
    const setSavedLabel = useQuizStore((state) => state.setSavedLabel);

    // Question store
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const setQuestionOptions = useQuestionStore(
        (state) => state.setQuestionOptions
    );

    // Cusotm hook
    const { debounceUpdateOption } = useOptionAutoSave({
        assessmentId,
        quizId,
        questionId,
    });

    const handleAddOption = async (questionType) => {
        try {
            setIsFormSaving(true);
            // Create he intial option with temporary id
            const newOption = {
                option_temp_id: `${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                option_text: `${
                    questionType === "multiple_choice"
                        ? "Option"
                        : "Correct Answer"
                } ${questionOptions.length + 1}`,
                is_correct: questionType === "multiple_choice" ? false : true,
            };

            setQuestionOptions((prev) => [...prev, newOption]);

            const response = await addOption({
                assessmentId,
                quizId,
                questionId,
            });

            // Merge the IDs of the craeted option in the backend to
            setQuestionOptions((prev) =>
                prev.map((opt) => {
                    // Find the initially created option
                    if (opt.option_temp_id === newOption.option_temp_id) {
                        // Merge the IDs to the option from backend
                        const updatedOption = {
                            ...opt,
                            question_option_id:
                                response.data.option[0].question_option_id,
                            question_id: response.data.option[0].question_id,
                        };
                        console.log(updatedOption);
                        // Set it as option to edit
                        setOptionToEdit(updatedOption);

                        return updatedOption;
                    }

                    return opt;
                })
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
    };

    const handleOptionChange = (optionToUpdate, index, questionType) => {
        if (optionToUpdate.question_option_id) {
            setQuestionOptions((prev) => {
                // List of updated option
                const newOptions = prev.map((option) =>
                    option.question_option_id ===
                    optionToUpdate.question_option_id
                        ? {
                              ...option,
                              option_text: optionToUpdate.option_text,
                              is_correct: optionToUpdate.is_correct,
                          }
                        : option
                );

                const updatedOption = newOptions.find(
                    (o) =>
                        o.question_option_id ===
                        optionToUpdate.question_option_id
                );

                // Check first for id
                // this verifies that the data from backend was verfied

                // If the option name is empty update it with the default value
                debounceUpdateOption(
                    updatedOption.option_text.trim() !== ""
                        ? updatedOption
                        : {
                              ...updatedOption,
                              option_text: `${
                                  questionType === "multiple_choice"
                                      ? "Option"
                                      : "Correct Answer"
                              } ${index + 1}`,
                          }
                );

                return newOptions;
            });
        }
    };

    const handleDeleteOption = async (option) => {
        try {
            setIsFormSaving(true);
            // Remove first the option in the list before making a request
            // to make it more responsive
            setQuestionOptions((prev) =>
                prev.filter(
                    (opt) =>
                        opt.question_option_id !== option.question_option_id
                )
            );

            await deleteOption({
                assessmentId,
                quizId,
                questionId,
                optionId: option.question_option_id,
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
    };

    return {
        handleAddOption,
        optionToEdit,
        setOptionToEdit,
        handleOptionChange,
        handleDeleteOption,
    };
}
