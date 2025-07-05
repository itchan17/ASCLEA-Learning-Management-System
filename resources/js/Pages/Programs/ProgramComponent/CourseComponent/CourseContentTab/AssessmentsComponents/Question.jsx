import React, { useState, useRef, useEffect } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlineDragIndicator } from "react-icons/md";
import QuestionForm from "./QuestionFormComponents/QuestionForm";
import useCreateQuizStore from "../../../../../../Stores/Programs/CourseContent/createQuizStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Question({
    questionDetails,
    questionNumber,
    questionIndex,
    onEdit,
    setOnEdit,
    selectedIndex,
    setSelectedIndex,
    disabled,
}) {
    // Create Quiz Store
    const setQuestionDetails = useCreateQuizStore(
        (state) => state.setQuestionDetails
    );
    const handleDeleteQuestion = useCreateQuizStore(
        (state) => state.handleDeleteQuestion
    );

    const [activeForm, setActiveForm] = useState("");
    let targetForm = useRef(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({
        id: questionDetails.id,
        transition: {
            duration: 300,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
        animateLayoutChanges: () => false,
        disabled,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    useEffect(() => {
        {
            console.log("TARGET FORM: " + targetForm.current);
        }

        if (targetForm.current) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeForm, selectedIndex]);

    const handleEditBtn = () => {
        setSelectedIndex(questionIndex);
        setActiveForm(questionDetails.questionType);
        setQuestionDetails(questionDetails);
        setOnEdit(true);
    };

    useEffect(() => {
        console.log("QUESTION RENDERING");
    }, [onEdit, selectedIndex]);
    return (
        <div className="space-y-5">
            <div
                ref={setNodeRef}
                {...attributes}
                style={style}
                className={` bg-ascend-white ${
                    onEdit && selectedIndex === questionIndex
                        ? "hidden"
                        : "flex"
                } shadow-shadow2 `}
            >
                <div className="space-y-2 w-full p-5 border-t border-l border-b border-ascend-gray1">
                    <div className="flex justify-end gap-1 text-ascend-black">
                        <div
                            onClick={handleEditBtn}
                            className="p-1 rounded-3xl hover:bg-ascend-lightblue transition-all duration-300"
                        >
                            <AiFillEdit
                                title="Edit question"
                                className="cursor-pointer text-size4 text-ascend-yellow"
                            />
                        </div>
                        <div
                            onClick={() => handleDeleteQuestion(questionIndex)}
                            className="p-1 rounded-3xl hover:bg-ascend-lightblue transition-all duration-300"
                        >
                            <AiFillDelete
                                title="Delete question"
                                className="cursor-pointer text-size4 text-ascend-red"
                            />
                        </div>
                    </div>

                    <div className="flex">
                        <span>{questionNumber}.</span>
                        <div className="w-full min-w-0 ml-2 space-y-5">
                            {/* Question */}
                            <div className="flex items-start gap-2 md:gap-20">
                                <p className="flex-1 min-w-0 break-words">
                                    {questionDetails.question}
                                    {questionDetails.required && (
                                        <span className="text-ascend-red ml-1">
                                            *
                                        </span>
                                    )}
                                </p>
                                <span className="font-bold">
                                    {`${questionDetails.questionPoints} ${
                                        questionDetails.questionPoints > 1
                                            ? "pts"
                                            : "pt"
                                    }`}
                                </span>
                            </div>
                            {/* List questions */}
                            {questionDetails.questionType ===
                            "multipleChoice" ? (
                                <div className="flex flex-col space-y-4">
                                    {questionDetails.questionChoices?.length >
                                        0 &&
                                        questionDetails.questionChoices?.map(
                                            (choice, i) => {
                                                return (
                                                    // List choices for multiple choice
                                                    <label
                                                        key={i}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            disabled
                                                            type="radio"
                                                            name="multipleChoiceOption"
                                                            value={choice}
                                                            className="w-5 h-5 accent-ascend-blue shrink-0"
                                                        />
                                                        <span className="ml-3 min-w-0 break-words">
                                                            {choice}
                                                        </span>
                                                    </label>
                                                );
                                            }
                                        )}
                                </div>
                            ) : questionDetails.questionType ===
                              "trueOrFalse" ? (
                                <div className="flex flex-col space-y-4">
                                    {questionDetails.questionChoices?.length >
                                        0 &&
                                        questionDetails.questionChoices?.map(
                                            (choice, i) => {
                                                return (
                                                    // List choices for true or false
                                                    <label
                                                        key={i}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            disabled
                                                            type="radio"
                                                            name="trueOrFalseOption"
                                                            value={choice}
                                                            className="w-5 h-5 accent-ascend-blue"
                                                        />
                                                        <span className="ml-3">
                                                            {choice}
                                                        </span>
                                                    </label>
                                                );
                                            }
                                        )}
                                </div>
                            ) : (
                                // Question for identification
                                <input
                                    disabled
                                    type="text"
                                    placeholder="Enter answer"
                                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    style={{ touchAction: "none" }}
                    ref={setActivatorNodeRef}
                    {...(!disabled && listeners)}
                    className="flex items-center self-stretch bg-ascend-blue cursor-grab"
                >
                    <MdOutlineDragIndicator className="text-2xl text-ascend-white " />
                </div>
            </div>

            {(activeForm === "multipleChoice" ||
                activeForm === "trueOrFalse" ||
                activeForm === "identification") &&
                onEdit &&
                selectedIndex === questionIndex && (
                    <div ref={targetForm}>
                        <QuestionForm
                            activeForm={activeForm}
                            setActiveForm={setActiveForm}
                            onEdit={onEdit}
                            questionIndex={questionIndex}
                            setSelectedIndex={setSelectedIndex}
                        />
                    </div>
                )}
        </div>
    );
}
