import { memo } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useQuestionStore from "./Stores/questionStore";
import useQuestion from "./Hooks/useQuestion";
import { usePage } from "@inertiajs/react";

export default memo(function Question({
    questionDetails,
    disabled,
    questionNumber,
}) {
    console.log(`QUESTION RENDERING: ${questionDetails.question_id}`);
    const { assessmentId, quiz } = usePage().props;
    // Question store
    const setOnEdit = useQuestionStore((state) => state.setOnEdit);
    const setQuestionDetails = useQuestionStore(
        (state) => state.setQuestionDetails
    );
    const setQuestionOptions = useQuestionStore(
        (state) => state.setQuestionOptions
    );

    // Custom hook
    const { handleDeleteQuestion, clearQuestionDetails } = useQuestion({
        assessmentId,
        quizId: quiz.quiz_id,
    });

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({
        id: questionDetails.question_id,
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

    const handleEditBtn = () => {
        console.log("EDIT BUTTON CLICKED");
        clearQuestionDetails();
        setQuestionDetails(questionDetails);
        setQuestionOptions(questionDetails.options);
        setOnEdit(true);
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className={` bg-ascend-white flex shadow-shadow1 relative z-100`}
        >
            <div className="space-y-2 w-full p-5 border-t border-l border-b border-ascend-gray1">
                <div className="flex justify-end gap-1 text-ascend-black">
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={handleEditBtn}
                        className="p-1 rounded-3xl hover:bg-ascend-lightblue transition-all duration-300"
                    >
                        <AiFillEdit
                            title="Edit question"
                            className="cursor-pointer text-size4 text-ascend-yellow"
                        />
                    </div>
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() =>
                            handleDeleteQuestion(questionDetails.question_id)
                        }
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
                                {questionDetails.is_required == true && (
                                    <span className="text-ascend-red ml-1">
                                        *
                                    </span>
                                )}
                            </p>
                            <span className="font-bold">
                                {`${questionDetails.question_points} ${
                                    questionDetails.question_points > 1
                                        ? "pts"
                                        : "pt"
                                }`}
                            </span>
                        </div>
                        {/* List questions */}
                        {questionDetails.question_type === "multiple_choice" ? (
                            <div className="flex flex-col space-y-4">
                                {questionDetails.options?.length > 0 &&
                                    questionDetails.options?.map(
                                        (option, i) => {
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
                                                        value={
                                                            option.option_text
                                                        }
                                                        className="w-5 h-5 accent-ascend-blue shrink-0"
                                                    />
                                                    <span className="ml-3 min-w-0 break-words">
                                                        {option.option_text}
                                                    </span>
                                                </label>
                                            );
                                        }
                                    )}
                            </div>
                        ) : questionDetails.question_type ===
                          "true_or_false" ? (
                            <div className="flex flex-col space-y-4">
                                {questionDetails.options?.length > 0 &&
                                    questionDetails.options?.map(
                                        (option, i) => {
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
                                                        value={
                                                            option.option_text
                                                        }
                                                        className="w-5 h-5 accent-ascend-blue"
                                                    />
                                                    <span className="ml-3">
                                                        {option.option_text}
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
                className="border-y border-r border-ascend-gray1 flex items-center self-stretch bg-ascend-blue cursor-grab "
            >
                <MdOutlineDragIndicator className="text-2xl  text-ascend-white" />
            </div>
        </div>
    );
});
