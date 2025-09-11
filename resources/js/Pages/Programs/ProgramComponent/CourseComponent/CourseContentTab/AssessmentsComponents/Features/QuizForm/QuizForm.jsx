import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import TextEditor from "../../../../TextEditor";
import Question from "./Question/Question";
import SecondaryButton from "../../../../../../../../Components/Button/SecondaryButton";
import QuestionForm from "./Question/QuestionForm";
import QuizFormNav from "./Components/QuizFormNav";
import useQuizAutosave from "./Hooks/useQuizAutoSave";
import useQuizDetails from "./Hooks/useQuizDetails";
import useQuizStore from "./Stores/quizStore";
import useQuestion from "./Question/Hooks/useQuestion";
import useQuestionStore from "./Question/Stores/questionStore";
import useAssessmentsStore from "../../../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensors,
    useSensor,
} from "@dnd-kit/core";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export function useQuiz() {
    return useContext(QuizContext);
}

export default function QuizForm({ courseId, assessmentId, quiz }) {
    // Custom hooks
    const { debounceAutoSave } = useQuizAutosave({
        assessmentId,
        quizId: quiz.quiz_id,
    });
    const { initializeQuizDetails, handleQuizDetailsChange } = useQuizDetails();
    const {
        handleCreateInitialQuestion,
        clearQuestionDetails,
        isCreatingQuestion,
        handleQuestionReordering,
    } = useQuestion({
        assessmentId,
        quizId: quiz.quiz_id,
    });

    // Quiz store
    const resetQuizStore = useQuizStore((state) => state.resetQuizStore);
    const quizDetails = useQuizStore((state) => state.quizDetails);
    const isQuizDetailsChanged = useQuizStore(
        (state) => state.isQuizDetailsChanged
    );

    // Question store
    const questionDetails = useQuestionStore((state) => state.questionDetails);
    const resetQuestionStore = useQuestionStore(
        (state) => state.resetQuestionStore
    );
    const questionList = useQuestionStore((state) => state.questionList);
    const setQuestionList = useQuestionStore((state) => state.setQuestionList);
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const onEdit = useQuestionStore((state) => state.onEdit);

    // Assessment store
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);
    const setAssessmentList = useAssessmentsStore(
        (state) => state.setAssessmentList
    );
    const assessmentByCourse = useAssessmentsStore(
        (state) => state.assessmentByCourse
    );
    const updateAssessmentInList = useAssessmentsStore(
        (state) => state.updateAssessmentInList
    );

    // Refs
    const targetForm = useRef(null);
    const multipleChoiceRef = useRef(null);
    const truOrFalseRef = useRef(null);
    const indentificationRef = useRef(null);

    useEffect(() => {
        initializeQuizDetails(quiz);
        setQuestionList(quiz.questions);
    }, []);

    // Reset the store when component was unmounted
    useEffect(() => {
        return () => {
            resetQuizStore();
            resetQuestionStore();
        };
    }, []);

    // Function that updates the quiz title in the assessment list of the course
    const updateQuizTitleInAssessmentList = () => {
        if (
            assessmentByCourse[courseId] &&
            assessmentByCourse[courseId].list.length > 0
        ) {
            const assessmentToUpdate = assessmentByCourse[courseId].list.find(
                (assessment) => assessment.assessment_id === assessmentId
            );

            // Checks if the quiz title changed
            if (
                assessmentToUpdate &&
                assessmentToUpdate.quiz.quiz_title !== quizDetails.quiz_title
            ) {
                const updatedQuizTitle = assessmentByCourse[courseId].list.map(
                    (assessment) =>
                        assessment.assessment_id === assessmentId &&
                        assessment.assessment_type.assessment_type === "quiz"
                            ? {
                                  ...assessment,
                                  quiz: {
                                      ...assessment.quiz,
                                      quiz_title: quizDetails.quiz_title,
                                  },
                              }
                            : assessment
                );

                updateAssessmentInList(updatedQuizTitle, courseId);
            }
        }
    };

    // Handles update of quiz details changes in backend
    useEffect(() => {
        // Only render when there's a changes to the details
        // not when the quizdetails was initally set
        console.log("QUIZ FORM IS RUNNUNG");
        if (isQuizDetailsChanged) {
            if (quizDetails.quiz_title.trim() !== "") {
                if (quizDetails.duration.toString().trim() === "") {
                    const updatedQuizDetails = { ...quizDetails, duration: 0 };
                    debounceAutoSave(updatedQuizDetails);
                } else {
                    debounceAutoSave(quizDetails);
                }

                updateQuizTitleInAssessmentList(); // Updates the quiz title in the list
            }
        }
    }, [quizDetails, debounceAutoSave]);

    // Scroll into the form once opened
    useEffect(() => {
        if (questionDetails && targetForm.current) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [questionDetails]);

    // Helper function for getting the index
    const getQuestionPos = (id) =>
        questionList.findIndex((question) => question.question_id === id);

    // Function for sorting the array
    const handleDragEnd = (event) => {
        console.log("THIS IS RUNNING");
        const { active, over } = event;

        if (active.id === over.id) return;

        const originalPos = getQuestionPos(active.id);
        const newPos = getQuestionPos(over.id);

        const updatedOrder = arrayMove(questionList, originalPos, newPos).map(
            (item, index) => ({
                ...item,
                sort_order: index + 1,
            })
        );

        handleQuestionReordering(active.id, newPos, updatedOrder, originalPos);
    };

    // This allows drag and drop in mobile device
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Close the form when the user click outside the form
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(event.target);
            // If the click is outside the element referenced by `targetForm`
            if (
                targetForm.current &&
                !targetForm.current.contains(event.target) &&
                !multipleChoiceRef.current.contains(event.target) &&
                !truOrFalseRef.current.contains(event.target) &&
                !indentificationRef.current.contains(event.target) &&
                !isCreatingQuestion
            ) {
                clearQuestionDetails();
            }
        };

        // Attach listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCreatingQuestion, targetForm, questionDetails, questionOptions]);

    useEffect(() => console.log(questionList), [questionList]);

    useEffect(() => console.log(quizDetails), [quizDetails]);

    const itemIds = useMemo(
        () => questionList.map((q) => q.question_id),
        [questionList]
    );

    return (
        <div className="font-nunito-sans relative space-y-5 text-ascend-black">
            <QuizFormNav />

            <div className="flex justify-center px-5 pb-5 lg:px-[150px]">
                <div className="w-full max-w-235 space-y-5">
                    <div className="w-full space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 w-full">
                            <div className="col-span-1 sm:col-span-3">
                                <label className="font-bold">
                                    Title
                                    <span className="text-ascend-red">*</span>
                                </label>
                                <input
                                    maxLength={255}
                                    type="text"
                                    value={quizDetails.quiz_title}
                                    onChange={(e) =>
                                        handleQuizDetailsChange(
                                            "quiz_title",
                                            e.target.value
                                        )
                                    }
                                    className="px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                                />
                            </div>
                            <div className="w-full">
                                <label className="font-bold">Duration</label>
                                <label className="text-size2"> (Minutes)</label>
                                <input
                                    type="number"
                                    value={quizDetails.duration}
                                    onChange={(e) =>
                                        handleQuizDetailsChange(
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                    min="0"
                                    max="9999"
                                    // Prevent user from typing "-"
                                    onKeyDown={(e) => {
                                        if (e.key === "-") {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Description</label>
                            <TextEditor
                                fieldName={"quiz_description"}
                                value={quizDetails.quiz_description}
                                setValue={handleQuizDetailsChange}
                            />
                        </div>

                        {/* Question List */}

                        {questionList.length > 0 && (
                            <div className="space-y-5">
                                <h1 className="font-bold">Questions:</h1>
                                <DndContext
                                    sensors={sensors}
                                    onDragEnd={handleDragEnd}
                                    collisionDetection={closestCorners}
                                    modifiers={[restrictToVerticalAxis]}
                                >
                                    <SortableContext
                                        items={itemIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {questionList.map((question, i) => {
                                            // console.log(questionDetails);
                                            return questionDetails &&
                                                questionDetails.question_id ===
                                                    question.question_id &&
                                                onEdit ? (
                                                <div
                                                    key={question.question_id}
                                                    ref={targetForm}
                                                    className="scroll-mt-50"
                                                >
                                                    <QuestionForm />
                                                </div>
                                            ) : (
                                                <Question
                                                    key={question.question_id}
                                                    questionDetails={question}
                                                    questionNumber={i + 1}
                                                    disabled={false}
                                                />
                                            );
                                        })}
                                    </SortableContext>
                                </DndContext>
                            </div>
                        )}

                        {/* Display the question form */}
                        {questionDetails && !onEdit && (
                            <div ref={targetForm}>
                                <QuestionForm key={questionList.length} />
                            </div>
                        )}

                        <div className="space-y-5">
                            <h1 className="font-bold">
                                Select Type of Question
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div ref={multipleChoiceRef}>
                                    <SecondaryButton
                                        doSomething={() =>
                                            handleCreateInitialQuestion(
                                                "multiple_choice"
                                            )
                                        }
                                        width={"w-full"}
                                        text={"Multiple Choice"}
                                    />
                                </div>

                                <div ref={truOrFalseRef}>
                                    <SecondaryButton
                                        doSomething={() => {
                                            handleCreateInitialQuestion(
                                                "true_or_false"
                                            );
                                        }}
                                        width={"w-full"}
                                        text={"True or False"}
                                    />
                                </div>

                                <div ref={indentificationRef}>
                                    <SecondaryButton
                                        doSomething={() => {
                                            handleCreateInitialQuestion(
                                                "identification"
                                            );
                                        }}
                                        width={"w-full"}
                                        text={"Identification"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

QuizForm.layout = null;
