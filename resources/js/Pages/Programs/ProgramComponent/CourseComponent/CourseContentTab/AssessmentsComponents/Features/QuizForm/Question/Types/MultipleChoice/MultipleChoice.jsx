import { useState, useEffect, useCallback } from "react";
import useCreateQuizStore from "../../../../../../../../../../../Stores/Programs/CourseContent/createQuizStore";
import SecondaryButton from "../../../../../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../../../../../Components/Button/PrimaryButton";
import { BiPlus } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { debounce } from "lodash";
import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import useQuestionStore from "../../Stores/questionStore";
import useOption from "../../Hooks/useOption";

export default function MultipleChoice({
    options,
    setOptions,
    isAddOption,
    setIsAddOption,
    questionDetails,
    setQuestionDetails,
}) {
    const { assessmentId, quiz } = usePage().props;

    // Question store
    const questionOptions = useQuestionStore((state) => state.questionOptions);

    // Custom hooks
    const {
        handleAddOption,
        optionToEdit,
        setOptionToEdit,
        handleOptionChange,
        handleDeleteOption,
    } = useOption({
        assessmentId,
        quizId: quiz.quiz_id,
        questionId: questionDetails.question_id,
    });
    // Create Quiz Store
    // const questionDetails = useCreateQuizStore(
    //     (state) => state.questionDetails
    // );
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    const handleEditOption = useCreateQuizStore(
        (state) => state.handleEditOption
    );
    // const handleDeleteOption = useCreateQuizStore(
    //     (state) => state.handleDeleteOption
    // );

    // Local State
    // const [optionToEdit, setOptionToEdit] = useState(null);

    // Functions
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    // const toggleAddOption = () => {
    //     console.log("Clicked");
    //     // display the input field for option
    //     // clear the option state everytime it is toggle
    //     setIsAddOption(!isAddOption);
    //     setOption("");
    //     setOptionToEdit(null);
    // };

    // const handleAddOption = () => {
    //     console.log(SlOptions);

    //     // pass the input option tot he function and add it to the question_choices array
    //     handleQuestionDetailsChange("question_choices", options);
    //     setOption("");
    //     toggleAddOption();
    // };

    // const setCorrectAnswer = (option) => {
    //     console.log(option);
    //     console.log(questionDetails.questionAnswer.includes(option));
    //     // check first if the selected option is already set as correct if not unset the option as inncorrect
    //     if (questionDetails.questionAnswer.includes(option)) {
    //         let newQuestionAnswer = questionDetails.questionAnswer.filter(
    //             (ans) => ans !== option
    //         );
    //         handleQuestionDetailsChange("questionAnswer", newQuestionAnswer);
    //     } else {
    //         // add the selected option to the array of questionAnswer
    //         handleQuestionDetailsChange("questionAnswer", option);
    //     }
    // };

    // this will run every time option was clicked to edit
    // useEffect(() => {
    //     if (optionToEdit) {
    //         // this will display the option input field
    //         setIsAddOption(true);

    //         // this will set the value of the option input field
    //         setOption(optionToEdit.option);
    //     }
    // }, [optionToEdit]);

    // const handleAddOption = async () => {
    //     try {
    //         // Create he intial option with temporary id
    //         const newOption = {
    //             option_temp_id: `${Date.now()}-${Math.random()
    //                 .toString(36)
    //                 .substr(2, 9)}`,
    //             option_text: `Option ${questionOptions.length + 1}`,
    //         };

    //         setOptions((prev) => [...prev, newOption]);

    //         const response = await axios.post(
    //             route("assessment.quiz-form.question.option.create", {
    //                 assessment: assessmentId,
    //                 quiz: quiz.quiz_id,
    //                 question: questionDetails.question_id,
    //             })
    //         );

    //         // Merge the IDs of the craeted option in the backend to
    //         setOptions((prev) =>
    //             prev.map((opt) => {
    //                 // Find the initially created option
    //                 if (opt.option_temp_id === newOption.option_temp_id) {
    //                     // Merge the IDs to the option from backend
    //                     const updatedOption = {
    //                         ...opt,
    //                         question_option_id:
    //                             response.data.option.question_option_id,
    //                         question_id: response.data.option.question_id,
    //                     };

    //                     // Set it as option to edit
    //                     setOptionToEdit(updatedOption);

    //                     return updatedOption;
    //                 }

    //                 return opt;
    //             })
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const debounceUpdateOption = useCallback(
    //     debounce(async (data) => {
    //         try {
    //             console.log(data);
    //             const response = await axios.put(
    //                 route("assessment.quiz-form.question.option.update", {
    //                     assessment: assessmentId,
    //                     quiz: quiz.quiz_id,
    //                     question: data.question_id,
    //                     option: data.question_option_id,
    //                 }),
    //                 data
    //             );
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }, 300),
    //     []
    // );

    // Handle the udpate of option text and setting as correct answer
    // has optionToUpdate which contains the updated option data
    // const handleOptionChange = (optionToUpdate, index) => {
    //     setOptions((prev) => {
    //         // List of updated option
    //         const newOptions = prev.map((option) =>
    //             option.question_option_id === optionToUpdate.question_option_id
    //                 ? {
    //                       ...option,
    //                       option_text: optionToUpdate.option_text,
    //                       is_correct: optionToUpdate.is_correct,
    //                   }
    //                 : option
    //         );

    //         const updatedOption = newOptions.find(
    //             (o) =>
    //                 o.question_option_id === optionToUpdate.question_option_id
    //         );

    //         // Check first for id
    //         // this verifies that the data from backend was verfied
    //         if (updatedOption.question_option_id) {
    //             // If the option name is empty update it with the default value
    //             debounceUpdateOption(
    //                 updatedOption.option_text.trim() !== ""
    //                     ? updatedOption
    //                     : {
    //                           ...updatedOption,
    //                           option_text: `Option ${index + 1}`,
    //                       }
    //             );
    //         }

    //         return newOptions;
    //     });
    // };

    // useEffect(() => {
    //     return () => {
    //         debounceUpdateOption.cancel(); // cancels any pending API call
    //     };
    // }, [debounceUpdateOption]);

    // const handleDeleteOption = async (option) => {
    //     try {
    //         // Remove first the option in the list before making a request
    //         // to make it more responsive
    //         setOptions((prev) =>
    //             prev.filter(
    //                 (opt) =>
    //                     opt.question_option_id !== option.question_option_id
    //             )
    //         );

    //         const response = await axios.delete(
    //             route("assessment.quiz-form.question.option.delete", {
    //                 assessment: assessmentId,
    //                 quiz: quiz.quiz_id,
    //                 question: questionDetails.question_id,
    //                 option: option.question_option_id,
    //             })
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <div className="space-y-5">
            <div>
                {/* List Options */}
                {questionOptions.length > 0 && (
                    <label className="font-bold">
                        Options{" "}
                        <span className="text-size1">
                            (Click option/s to set correct asnwer)
                        </span>
                    </label>
                )}

                <div className="space-y-5">
                    {questionOptions &&
                        questionOptions.length > 0 &&
                        questionOptions.map((option, i) => {
                            console.log(optionToEdit);
                            return optionToEdit &&
                                optionToEdit.question_option_id &&
                                optionToEdit.question_option_id ==
                                    option.question_option_id ? (
                                // Input field for edit option
                                <div
                                    key={option.question_option_id || i}
                                    className="relative"
                                >
                                    <div
                                        onClick={() =>
                                            handleOptionChange(
                                                {
                                                    ...optionToEdit,
                                                    is_correct:
                                                        !optionToEdit.is_correct,
                                                },
                                                i
                                            )
                                        }
                                        className={`absolute border-l-2 border-y-2 rounded-bl-[3px] rounded-tl-[3px] border-ascend-blue top-1/2 -translate-y-1/2 flex items-center px-4 h-full cursor-pointer ${
                                            option.is_correct
                                                ? "bg-ascend-lightgreen"
                                                : "bg-ascend-white"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center bg-ascend-white rounded-full w-5 h-5 shrink-0 ${
                                                option.is_correct
                                                    ? "border-ascend-green border-2"
                                                    : "border-ascend-gray2 border"
                                            } transition-all duration-300`}
                                        >
                                            <div
                                                className={`rounded-full shrink-0 ${
                                                    option.is_correct
                                                        ? "bg-ascend-green w-3 h-3"
                                                        : "bg-ascend-white w-0 h-0 "
                                                } transition-all duration-300`}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        autoFocus
                                        key={i}
                                        type="text"
                                        value={option.option_text}
                                        className="w-full border border-ascend-gray1 focus:outline-ascend-blue pl-15 pr-3 py-2"
                                        placeholder="Type option"
                                        onChange={(e) =>
                                            handleOptionChange(
                                                {
                                                    ...optionToEdit,
                                                    option_text: e.target.value,
                                                },
                                                i
                                            )
                                        }
                                        onBlur={(e) => {
                                            setOptionToEdit(null);
                                            if (e.target.value.trim() === "") {
                                                handleOptionChange(
                                                    {
                                                        ...optionToEdit,
                                                        option_text: `Option ${
                                                            i + 1
                                                        }`,
                                                    },
                                                    i
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                // Option
                                <div
                                    key={option.question_option_id || i}
                                    onClick={() =>
                                        handleOptionChange(
                                            {
                                                ...option,
                                                is_correct: !option.is_correct,
                                            },
                                            i
                                        )
                                    }
                                    className={`flex border border-ascend-gray1 cursor-pointer  relative ${
                                        option.is_correct
                                            ? "bg-ascend-lightgreen"
                                            : "bg-ascend-white"
                                    } transition-all duration-300`}
                                >
                                    <div className="flex items-center pl-4 pr-3 py-2">
                                        <div
                                            className={`flex items-center justify-center bg-ascend-white rounded-full w-5 h-5 shrink-0 ${
                                                option.is_correct
                                                    ? "border-ascend-green border-2"
                                                    : "border-ascend-gray2 border"
                                            } transition-all duration-300`}
                                        >
                                            <div
                                                className={`rounded-full shrink-0 ${
                                                    option.is_correct
                                                        ? "bg-ascend-green w-3 h-3"
                                                        : "bg-ascend-white w-0 h-0 "
                                                } transition-all duration-300`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center cursor-pointer w-full px-3 py-2">
                                        <p className="flex-1 min-w-0 break-words">
                                            {option.option_text}
                                        </p>
                                        <div className="flex gap-2">
                                            <div
                                                onClick={(e) => {
                                                    stopPropagation(e);
                                                    setOptionToEdit(option);
                                                }}
                                                className={` rounded-3xl ${
                                                    option.is_correct
                                                        ? "hover:bg-ascend-green/15"
                                                        : "hover:bg-ascend-lightblue"
                                                } transition-all duration-300`}
                                            >
                                                <AiFillEdit className="shrink-0 text-size4 text-ascend-yellow" />
                                            </div>
                                            <div
                                                className={`group  rounded-3xl ${
                                                    option.is_correct
                                                        ? "hover:bg-ascend-green/15"
                                                        : "hover:bg-ascend-lightblue"
                                                } transition-all duration-300`}
                                            >
                                                <AiFillDelete
                                                    onClick={(e) => {
                                                        stopPropagation(e);
                                                        handleDeleteOption(
                                                            option
                                                        );
                                                    }}
                                                    className="shrink-0 text-size4 text-ascend-red"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <SecondaryButton
                        doSomething={handleAddOption}
                        icon={<BiPlus />}
                        text={"Add option"}
                    />
                    {/* {!isAddOption ? (
                        <SecondaryButton
                            doSomething={toggleAddOption}
                            icon={<BiPlus />}
                            text={"Add option"}
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                value={option}
                                className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                                placeholder="Type option"
                                onChange={(e) => setOption(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <SecondaryButton
                                    doSomething={toggleAddOption}
                                    text={"Cancel"}
                                />
                                {optionToEdit ? (
                                    <PrimaryButton
                                        doSomething={() =>
                                            handleEditOption(
                                                optionToEdit,
                                                setOptionToEdit,
                                                setOption,
                                                toggleAddOption,
                                                option
                                            )
                                        }
                                        text={"Edit"}
                                    />
                                ) : (
                                    <PrimaryButton
                                        doSomething={handleAddOption}
                                        text={"Add"}
                                    />
                                )}
                            </div>
                        </>
                    )} */}
                </div>
            </div>
        </div>
    );
}
