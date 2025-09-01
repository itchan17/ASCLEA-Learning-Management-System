import { useState } from "react";
import useQuestionService from "../Services/useQuestionService";
import useQuestionStore from "../Stores/questionStore";
import useQuizStore from "../../Stores/quizStore";
import useQuizDetails from "../../Hooks/useQuizDetails";

export default function useQuestion({ assessmentId, quizId }) {
    // Quiz store
    const setIsQuizDetailsChanged = useQuizStore(
        (state) => state.setIsQuizDetailsChanged
    );
    const quizDetails = useQuizStore((state) => state.quizDetails);

    // Question store
    const questionDetails = useQuestionStore((state) => state.questionDetails);
    const setQuestionDetails = useQuestionStore(
        (state) => state.setQuestionDetails
    );
    const setQuestionOptions = useQuestionStore(
        (state) => state.setQuestionOptions
    );

    // Local state
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [initalQuestionPoints, setInitalQuestionPoints] = useState(
        questionDetails?.question_points || 0
    );

    // Custom hooks
    const { createInitalQuestion, updateQuestion } = useQuestionService({
        assessmentId,
        quizId,
    });
    const { handleQuizDetailsChange } = useQuizDetails();

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

    const handleQuestionDetailsChange = (field, value) => {
        setIsQuizDetailsChanged(true);
        if (field === "question_points") {
            const questionPoints = parseInt(
                value.length > 3 ? value.slice(0, 3) : value
            );

            setQuestionDetails((prev) => ({
                ...prev,
                [field]: questionPoints, // Limit the input to 3 char,
            }));

            // Update the question points
            // Initial question points was used for editing the question
            // since the question that will be editied is already part of the list
            // and it needs to be reduce first before updating the question points
            handleQuizDetailsChange(
                "quiz_total_points",
                quizDetails.quiz_total_points -
                    initalQuestionPoints +
                    questionPoints
            );
            setInitalQuestionPoints(questionPoints);
        } else {
            setQuestionDetails((prev) => ({
                ...prev,
                [field]: value,
            }));
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

    return {
        handleCreateInitialQuestion,
        clearQuestionDetails,
        handleQuestionDetailsChange,
    };
}
