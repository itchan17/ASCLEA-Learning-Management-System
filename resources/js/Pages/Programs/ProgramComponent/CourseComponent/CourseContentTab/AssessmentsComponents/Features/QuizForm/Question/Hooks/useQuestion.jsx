import { useState } from "react";
import createInitalQuestion from "../Services/questionService";
import useQuestionStore from "../Stores/questionStore";

export default function useQuestion({ assessmentId, quizId }) {
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

    // Question store
    const questionDetails = useQuestionStore((state) => state.questionDetails);
    const setQuestionDetails = useQuestionStore(
        (state) => state.setQuestionDetails
    );
    const setQuestionOptions = useQuestionStore(
        (state) => state.setQuestionOptions
    );

    const handleCreateInitialQuestion = async (questionType, sortOrder) => {
        const newQuestion = {
            is_required: false,
            question: "Question",
            question_points: 0,
            question_type: questionType,
            sort_order: 1,
        };

        // Create he intial option with temporary id for multiple choice type of question
        const newOption = {
            option_temp_id: `${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            option_text: "Option 1",
            is_correct: false,
        };

        try {
            console.log("WORKING");

            setIsCreatingQuestion(true);

            clearQuestionDetails();

            setQuestionDetails(newQuestion);

            // Set the inital to imeediately dispaly in the front end
            setQuestionOptions([newOption]);

            const response = await createInitalQuestion(
                assessmentId,
                quizId,
                questionType,
                sortOrder
            );

            // Merge the IDs from backend to the question details
            setQuestionDetails((prev) => ({
                ...prev,
                quiz_id: response.data.data.question.quiz_id,
                question_id: response.data.data.question.question_id,
            }));

            // Merge the IDs of the craeted option in the backend to
            setQuestionOptions((prev) =>
                prev.map((opt) =>
                    opt.option_temp_id === newOption.option_temp_id
                        ? {
                              ...opt,
                              question_option_id:
                                  response.data.data.options.question_option_id,
                              question_id:
                                  response.data.data.options.question_id,
                          }
                        : opt
                )
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsCreatingQuestion(false);
        }
    };

    const clearQuestionDetails = () => {
        // Check if theres questionDetails
        // this means the question form is curently open
        // if the user click another question type
        // the previous question will be added to the list
        // Ensures only question details with merged IDs from the
        // backend will be pushed in the list
        if (
            questionDetails &&
            questionDetails.quiz_id &&
            questionDetails.question_id
        ) {
            //These updated data was made because onBlur dont get triggered when
            // the form was closed through outside with ref
            // so we have to ensure no field are empty that will be displayed

            // // Ensures no empty option
            // const updatedOptions = questionOptions.map((option, i) =>
            //     option.option_text.trim() === ""
            //         ? { ...option, option_text: `Option ${i + 1}` }
            //         : option
            // );

            // // Enusres question is not empty
            // const updatedQuestionDetails =
            //     questionDetails.question.trim() === ""
            //         ? { ...questionDetails, question: "Question" }
            //         : questionDetails;

            // setQuestionList((prev) => [
            //     ...prev,
            //     { ...updatedQuestionDetails, options: updatedOptions },
            // ]);

            setQuestionDetails(null);
            setQuestionOptions([]);
            // setIsQuestioNDetailsChanged(false);
        }
    };

    return { handleCreateInitialQuestion, clearQuestionDetails };
}
