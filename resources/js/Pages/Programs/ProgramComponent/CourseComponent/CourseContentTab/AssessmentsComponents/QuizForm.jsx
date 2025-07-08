import React, { useEffect, useState, useRef } from "react";
import SinglePage from "../../../../../../Components/Layout/SInglePage";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import TextEditor from "../../TextEditor";
import useCreateQuizStore from "../../../../../../Stores/Programs/CourseContent/createQuizStore";
import Question from "./Question";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import QuestionForm from "./QuestionFormComponents/QuestionForm";
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

export default function QuizForm() {
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

    // Local States
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

        return totalPoints;
    };
    useEffect(() => {
        console.log(quizDetails);
        console.log("QUESTION LIST:", questionList);
    }, [quizDetails, questionList]);
    return (
        <SinglePage>
            <div className="w-full max-w-235 space-y-5">
                <div className="flex gap-5 items-center justify-between">
                    <h1 className="text-size6 font-bold text-nowrap">
                        Create Quiz
                    </h1>

                    <div className="flex justify-end items-center gap-2 w-full sm:w-auto">
                        <div className="hidden md:flex gap-1">
                            <input
                                type="checkbox"
                                defaultChecked={false}
                                className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                            />
                            <span className="text-ascend-black font-bold">
                                Cheating mitigation
                            </span>
                        </div>
                        <div className="hidden md:flex gap-1">
                            <input
                                type="checkbox"
                                defaultChecked={false}
                                className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                            />
                            <span className="text-ascend-black font-bold">
                                Show answers after
                            </span>
                        </div>

                        <PrimaryButton text={"Save Quiz"} />
                    </div>
                </div>
                <div className="md:hidden flex flex-col justify-end gap-2 ml-auto w-full sm:w-auto">
                    <div className="flex gap-1">
                        <input
                            type="checkbox"
                            defaultChecked={false}
                            className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                        />
                        <span className="text-ascend-black font-bold">
                            Cheating mitigation
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <input
                            type="checkbox"
                            defaultChecked={false}
                            className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                        />
                        <span className="text-ascend-black font-bold">
                            Show answers after
                        </span>
                    </div>
                </div>
                <div className="w-full space-y-5">
                    <div className="font-bold text-end">
                        Total points: {calcTotalPoints()}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 w-full">
                        <div className="col-span-1 sm:col-span-3">
                            <label className="font-bold">
                                Title<span className="text-ascend-red">*</span>
                            </label>
                            <input
                                type="text"
                                value={quizDetails.quizTitle}
                                onChange={(e) =>
                                    handleQuizDetailsChange(
                                        "quizTitle",
                                        e.target.value
                                    )
                                }
                                className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                            />
                        </div>
                        <div className="w-full">
                            <label>
                                Duration
                                <span className="text-size1"> (Minutes)</span>
                            </label>
                            <input
                                type="number"
                                value={quizDetails.quizDuration}
                                onChange={(e) =>
                                    handleQuizDetailsChange(
                                        "quizDuration",
                                        e.target.value
                                    )
                                }
                                min={1}
                                className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="font-bold">Description</label>
                        <TextEditor
                            fieldName={"quizDescription"}
                            value={quizDetails.quizDescription}
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
                                            setSelectedIndex={setSelectedIndex}
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
                        <h1 className="font-bold">Select Type of Question</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <SecondaryButton
                                doSomething={() => {
                                    clearQuestionDetails();
                                    handleOpenQuestionForm("multipleChoice");
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
                                    handleOpenQuestionForm("identification");
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
        </SinglePage>
    );
}

QuizForm.layout = null;
