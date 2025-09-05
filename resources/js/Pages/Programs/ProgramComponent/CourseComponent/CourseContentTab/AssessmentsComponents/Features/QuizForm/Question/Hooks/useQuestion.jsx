import { useState, useEffect, useCallback } from "react";
import useQuestionStore from "../Stores/questionStore";
import useQuizStore from "../../Stores/quizStore";
import useQuizDetails from "../../Hooks/useQuizDetails";
import {
    createInitalQuestion,
    deleteQuestion,
} from "../Services/questionService";
import DefaultCustomToast from "../../../../../../../../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../../../../../../../../Utils/displayToast";

export default function useQuestion({ assessmentId, quizId }) {
    // Quiz store
    const setIsFormSaving = useQuizStore((state) => state.setIsFormSaving);
    const setSavedLabel = useQuizStore((state) => state.setSavedLabel);
    const quizDetails = useQuizStore((state) => state.quizDetails);

    // Question store
    const questionDetails = useQuestionStore((state) => state.questionDetails);
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const setQuestionDetails = useQuestionStore(
        (state) => state.setQuestionDetails
    );
    const setQuestionOptions = useQuestionStore(
        (state) => state.setQuestionOptions
    );
    const setQuestionList = useQuestionStore((state) => state.setQuestionList);
    const onEdit = useQuestionStore((state) => state.onEdit);
    const setOnEdit = useQuestionStore((state) => state.setOnEdit);
    const questionList = useQuestionStore((state) => state.questionList);

    // Local state
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [initalQuestionPoints, setInitalQuestionPoints] = useState(
        questionDetails?.question_points || 0
    );
    const [isQuestionDetailsChanged, setIsQuestionDetailsChanged] =
        useState(false);

    // Custom hooks
    const { handleQuizDetailsChange } = useQuizDetails();

    const handleCreateInitialQuestion = async (questionType) => {
        if (!isCreatingQuestion) {
            const newQuestion = {
                is_required: false,
                question: "Question",
                question_points: 0,
                question_type: questionType,
            };

            try {
                setIsFormSaving(true);

                clearQuestionDetails();

                setIsCreatingQuestion(true);

                setQuestionDetails(newQuestion);

                const temporaryOptions = createTemporaryOptions(questionType);

                const response = await createInitalQuestion({
                    assessmentId,
                    quizId,
                    questionType,
                });

                // Merge the IDs from backend to the question details
                setQuestionDetails((prev) => ({
                    ...prev,
                    quiz_id: response.data.data.question.quiz_id,
                    question_id: response.data.data.question.question_id,
                }));

                // Merge the IDs of the craeted option in the backend to
                // We do not merge the IDs from backend in idetification type
                // since we don't have temporary option for this

                if (
                    questionType !== "identification" &&
                    temporaryOptions.length !== 0 &&
                    response.data.data.options
                ) {
                    setQuestionOptions((prev) =>
                        prev.map((opt, index) =>
                            opt.option_temp_id ===
                            temporaryOptions[index].option_temp_id
                                ? {
                                      ...opt,
                                      question_option_id:
                                          response.data.data.options[index]
                                              .question_option_id,
                                      question_id:
                                          response.data.data.options[index]
                                              .question_id,
                                  }
                                : opt
                        )
                    );
                }

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
                setIsCreatingQuestion(false);
                setIsFormSaving(false);
            }
        }
    };

    // Create a temporary option based on the question type
    const createTemporaryOptions = (questionType) => {
        let temporaryOptions = [];

        if (questionType === "multiple_choice") {
            // Create he intial option with temporary id for multiple choice type of question

            temporaryOptions = [
                {
                    option_temp_id: `${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                    option_text: "Option 1",
                    is_correct: false,
                },
            ];
        } else if (questionType === "true_or_false") {
            // Create a temporary two options with temporary id, true and false
            temporaryOptions = [
                {
                    option_temp_id: `${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                    option_text: "True",
                    is_correct: false,
                },
                {
                    option_temp_id: `${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                    option_text: "False",
                    is_correct: false,
                },
            ];
        }

        setQuestionOptions(temporaryOptions);

        return temporaryOptions;
    };

    const handleQuestionDetailsChange = (field, value) => {
        setIsQuestionDetailsChanged(true);
        if (field === "question_points") {
            const questionPoints =
                value.trim() === ""
                    ? 0
                    : parseInt(value.length > 3 ? value.slice(0, 3) : value);
            console.log(value.trim() === "");

            setQuestionDetails((prev) => ({
                ...prev,
                [field]: value, // Limit the input to 3 char,
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

    const handleDeleteQuestion = async (questionId) => {
        try {
            setIsFormSaving(true);
            const updatedQuestionList = questionList.filter(
                (question) => question.question_id !== questionId
            );
            setQuestionList(updatedQuestionList);

            await deleteQuestion({ assessmentId, quizId, questionId });
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

    const clearQuestionDetails = () => {
        const latestQuestionDetails =
            useQuestionStore.getState().questionDetails;
        const latestQuestionOptions =
            useQuestionStore.getState().questionOptions;
        const latestQuestionList = useQuestionStore.getState().questionList;

        // Check if theres questionDetails
        // this means the question form is curently open
        // if the user click another question type
        // the previous question will be added to the list
        // Ensures only question details with merged IDs from the
        // backend will be pushed in the list
        if (
            latestQuestionDetails &&
            latestQuestionDetails.quiz_id &&
            latestQuestionDetails.question_id
        ) {
            //These updated data was made because onBlur dont get triggered when
            // the form was closed through outside with ref
            // so we have to ensure no field are empty that will be displayed

            // Ensures no empty option
            const updatedOptions = latestQuestionOptions.map((option, i) =>
                option.option_text.trim() === ""
                    ? {
                          ...option,
                          option_text: `${
                              latestQuestionDetails.question_type ===
                              "multiple_choice"
                                  ? "Option"
                                  : "Correct Answer"
                          } ${i + 1}`,
                      }
                    : option
            );

            // Ensures question and points are not empty
            let updatedQuestionDetails = latestQuestionDetails;

            if (latestQuestionDetails.question.trim() === "") {
                updatedQuestionDetails = {
                    ...updatedQuestionDetails,
                    question: "Question",
                };
            }
            if (
                latestQuestionDetails.question_points.toString().trim() === ""
            ) {
                updatedQuestionDetails = {
                    ...updatedQuestionDetails,
                    question_points: 0,
                };
            }

            if (onEdit) {
                setOnEdit(false);

                const updatedQuestionList = latestQuestionList.map((question) =>
                    question.question_id === updatedQuestionDetails.question_id
                        ? { ...updatedQuestionDetails, options: updatedOptions }
                        : question
                );

                setQuestionList(updatedQuestionList);
            } else {
                setQuestionList((prev) => [
                    ...prev,
                    { ...updatedQuestionDetails, options: updatedOptions },
                ]);
            }

            setQuestionDetails(null);
            setQuestionOptions([]);
        }
    };

    useEffect(() => {
        console.log(questionOptions);
    }, [questionOptions]);

    return {
        handleCreateInitialQuestion,
        clearQuestionDetails,
        handleQuestionDetailsChange,
        handleDeleteQuestion,
        isCreatingQuestion,
        isQuestionDetailsChanged,
    };
}
