import { useState } from "react";
import useQuestionStore from "../Stores/questionStore";
import useOptionService from "../Services/useOptionService";

export default function useOption({ assessmentId, quizId, questionId }) {
    // Local states
    const [optionToEdit, setOptionToEdit] = useState(null);

    // Question store
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const setQuestionOptions = useQuestionStore(
        (state) => state.setQuestionOptions
    );

    // Custom hook
    const { addOption } = useOptionService({
        assessmentId,
        quizId,
        questionId,
    });

    const handleAddOption = async () => {
        try {
            // Create he intial option with temporary id
            const newOption = {
                option_temp_id: `${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                option_text: `Option ${questionOptions.length + 1}`,
            };

            setQuestionOptions((prev) => [...prev, newOption]);

            const response = await addOption();

            // Merge the IDs of the craeted option in the backend to
            setQuestionOptions((prev) =>
                prev.map((opt) => {
                    // Find the initially created option
                    if (opt.option_temp_id === newOption.option_temp_id) {
                        // Merge the IDs to the option from backend
                        const updatedOption = {
                            ...opt,
                            question_option_id:
                                response.data.option.question_option_id,
                            question_id: response.data.option.question_id,
                        };
                        console.log(updatedOption);
                        // Set it as option to edit
                        setOptionToEdit(updatedOption);

                        return updatedOption;
                    }

                    return opt;
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    return { handleAddOption, optionToEdit, setOptionToEdit };
}
