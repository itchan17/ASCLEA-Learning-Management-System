import React, { useEffect, useState, useRef, useCallback } from "react";
import SinglePage from "../../../../../../Components/Layout/SInglePage";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import TextEditor from "../../TextEditor";
import useCreateQuizStore from "../../../../../../Stores/Programs/CourseContent/createQuizStore";
import Question from "./Question";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import QuestionForm from "./QuestionFormComponents/QuestionForm";
import BackButton from "../../../../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../../../../Utils/handleClickBackBtn";
import QuizFormNav from "./QuizFormNav";
import { debounce } from "lodash";
import axios from "axios";
import { usePage } from "@inertiajs/react";
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

export default function QuizForm({ programId, courseId, assessmentId, quiz }) {
    // Create Quiz Store
    const quizDetails = useCreateQuizStore((state) => state.quizDetails);
    const handleQuizDetailsChange = useCreateQuizStore(
        (state) => state.handleQuizDetailsChange
    );
    const questionList = useCreateQuizStore((state) => state.questionList);
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    const clearQuestionDetails = useCreateQuizStore(
        (state) => state.clearQuestionDetails
    );
    const setQuestionList = useCreateQuizStore(
        (state) => state.setQuestionList
    );
    const setQuizDetails = useCreateQuizStore((state) => state.setQuizDetails);
    const isChanged = useCreateQuizStore((state) => state.isChanged);
    const setIsChanged = useCreateQuizStore((state) => state.setIsChanged);

    // Local States
    const [isLoading, setIsLoading] = useState(false);
    const [savedLabel, setSavedLabel] = useState("");
    const [openQuestionForm, setOpenQuestionForm] = useState({
        multipleChoice: false,
        trueOrFalse: false,
        identification: false,
    });
    const [activeForm, setActiveForm] = useState("");
    const targetForm = useRef(null);
    const [onEdit, setOnEdit] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    useEffect(() => {
        setQuizDetails(quiz);
        setIsChanged(false);
    }, []);

    useEffect(() => {
        console.log("ON EDIT: " + onEdit);
    }, [onEdit]);

    // Scroll into the form once opened
    useEffect(() => {
        if (
            activeForm === "multipleChoice" ||
            activeForm === "trueOrFalse" ||
            activeForm === "identification"
        ) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeForm]);

    // Helper function for getting the index
    const getQuestionPos = (id) =>
        questionList.findIndex((question) => question.id === id);

    // Function for sorting the array
    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log(active);
        if (active.id === over.id) return;
        const originalPos = getQuestionPos(active.id);
        const newPos = getQuestionPos(over.id);

        const updatedOrder = arrayMove(questionList, originalPos, newPos).map(
            (item, index) => ({
                ...item,
                sortOrder: index + 1,
            })
        );
        console.log(updatedOrder);
        setQuestionList(updatedOrder);
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

    const handleOpenQuestionForm = (questionType) => {
        setOnEdit(false);
        setActiveForm(questionType);
    };

    const calcTotalPoints = () => {
        let totalPoints = 0;
        questionList.forEach(({ questionPoints }) => {
            totalPoints += questionPoints;
        });

        handleQuizDetailsChange("quiz_total_points", totalPoints);
    };

    const debounceAutoSave = useCallback(
        debounce(async (data) => {
            setIsLoading(true);
            try {
                const response = await axios.put(
                    route("assessment.quiz-form.update", {
                        program: programId,
                        course: courseId,
                        assessment: assessmentId,
                        quiz: quiz.quiz_id,
                    }),
                    data
                );
                console.log(response);
                setIsLoading(false);

                // Used to display the label in navbar
                // this truly indicates the the changes was saved
                // instead of using a text in conditional statement in the navbar
                // which causes an unwanted behaviour
                setSavedLabel("Changes saved");
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        // Only render wheneters a changes to the details
        // not when the quizdetails was initally set
        if (isChanged) {
            if (quizDetails.quiz_title.trim() !== "") {
                debounceAutoSave(quizDetails);
            }
        }
        console.log(quizDetails);
        return () => debounceAutoSave.cancel();
    }, [quizDetails, debounceAutoSave]);

    return (
        <div className="font-nunito-sans relative space-y-5 text-ascend-black">
            <QuizFormNav isLoading={isLoading} savedLabel={savedLabel} />
            <div className="w-full flex gap-5 items-center px-5 lg:px-[100px]">
                <BackButton doSomething={handleClickBackBtn} />
            </div>
            <div className="flex justify-center px-5 pb-5 lg:px-[150px]">
                <div className="w-full max-w-235 space-y-5">
                    <div className="flex gap-5 items-center justify-between">
                        <h1 className="text-size6 font-bold text-nowrap">
                            Create Quiz
                        </h1>

                        <div className="font-bold text-end">
                            Total points: {quizDetails.quiz_total_points || 0}
                        </div>
                    </div>

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
                                        console.log(e.key);
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
                                >
                                    <SortableContext
                                        items={questionList}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {questionList.map((question, i) => (
                                            <Question
                                                key={i}
                                                questionDetails={question}
                                                questionNumber={i + 1}
                                                questionIndex={i}
                                                onEdit={onEdit}
                                                setOnEdit={setOnEdit}
                                                selectedIndex={selectedIndex}
                                                setSelectedIndex={
                                                    setSelectedIndex
                                                }
                                                disabled={false}
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </div>
                        )}
                        <div>
                            {(activeForm === "multipleChoice" ||
                                activeForm === "trueOrFalse" ||
                                activeForm === "identification") &&
                                !onEdit && (
                                    <div ref={targetForm}>
                                        <QuestionForm
                                            activeForm={activeForm}
                                            setActiveForm={setActiveForm}
                                            setSelectedIndex={setSelectedIndex}
                                        />
                                    </div>
                                )}
                        </div>
                        <div className="space-y-5">
                            <h1 className="font-bold">
                                Select Type of Question
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <SecondaryButton
                                    doSomething={() => {
                                        clearQuestionDetails();
                                        handleOpenQuestionForm(
                                            "multipleChoice"
                                        );
                                        handleQuestionDetailsChange(
                                            "questionType",
                                            "multipleChoice"
                                        );
                                    }}
                                    width={"w-full"}
                                    text={"Multiple Choice"}
                                />
                                <SecondaryButton
                                    doSomething={() => {
                                        clearQuestionDetails();
                                        handleOpenQuestionForm("trueOrFalse");
                                        handleQuestionDetailsChange(
                                            "questionType",
                                            "trueOrFalse"
                                        );
                                    }}
                                    width={"w-full"}
                                    text={"True or False"}
                                />
                                <SecondaryButton
                                    doSomething={() => {
                                        clearQuestionDetails();
                                        handleOpenQuestionForm(
                                            "identification"
                                        );
                                        handleQuestionDetailsChange(
                                            "questionType",
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
    );
}

QuizForm.layout = null;
