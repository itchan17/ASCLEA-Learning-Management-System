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

export default function QuizForm({ assessmentId, quiz }) {
    // Create Quiz Store
    const quizDetails = useCreateQuizStore((state) => state.quizDetails);
    const handleQuizDetailsChange = useCreateQuizStore(
        (state) => state.handleQuizDetailsChange
    );
    // const questionList = useCreateQuizStore((state) => state.questionList);
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    // const clearQuestionDetails = useCreateQuizStore(
    //     (state) => state.clearQuestionDetails
    // );
    // const setQuestionList = useCreateQuizStore(
    //     (state) => state.setQuestionList
    // );
    const setQuizDetails = useCreateQuizStore((state) => state.setQuizDetails);
    const isChanged = useCreateQuizStore((state) => state.isChanged);
    const setIsChanged = useCreateQuizStore((state) => state.setIsChanged);

    // Local States
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [savedLabel, setSavedLabel] = useState(""); // Saved label in the navbar
    const [openQuestionForm, setOpenQuestionForm] = useState({
        multipleChoice: false,
        trueOrFalse: false,
        identification: false,
    });
    const [activeForm, setActiveForm] = useState("");
    const [onEdit, setOnEdit] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [questionDetails, setQuestionDetails] = useState(null);
    const [questionOptions, setQuestionOptions] = useState([]);
    const [isQuestioNDetailsChanged, setIsQuestioNDetailsChanged] =
        useState(false);
    const [questionList, setQuestionList] = useState([]);
    const [quizTotalPoints, setQuizTotalPoints] = useState(0);

    // Refs
    const targetForm = useRef(null);
    const multipleChoiceRef = useRef(null);
    const truOrFalseRef = useRef(null);
    const indentificationRef = useRef(null);

    useEffect(() => {
        setQuizDetails(quiz);
        setQuestionList(quiz.questions);
        setIsChanged(false);
    }, []);

    // A debounced function that handles auto save
    // used useCallback to prevent recreating of the function
    const debounceAutoSave = useCallback(
        debounce(async (data) => {
            setIsLoading(true);
            try {
                const response = await axios.put(
                    route("assessment.quiz-form.update", {
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
        // Only render when there's a changes to the details
        // not when the quizdetails was initally set
        if (isChanged) {
            if (quizDetails.quiz_title.trim() !== "") {
                debounceAutoSave(quizDetails);
            }
        }
        console.log(quizDetails);
        return () => debounceAutoSave.cancel();
    }, [quizDetails, debounceAutoSave]);

    useEffect(() => {
        console.log("ON EDIT: " + onEdit);
    }, [onEdit]);

    // Scroll into the form once opened
    useEffect(() => {
        if (questionDetails) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [questionDetails]);

    // Helper function for getting the index
    const getQuestionPos = (id) =>
        questionList.findIndex((question) => question.question_id === id);

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
                sort_order: index + 1,
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

    // Calculate the total points of the quiz
    useEffect(() => {
        let totalPoints = 0;
        questionList.forEach((question) => {
            totalPoints += question.question_points;
        });

        // Set the intial total points
        // when the user create new question this will be used
        // everytime the user makes chanegs to the question points
        setQuizTotalPoints(totalPoints);

        handleQuizDetailsChange("quiz_total_points", totalPoints);
    }, [questionList]);

    // Close the form when the user click outside the form
    useEffect(() => {
        const handleClickOutside = (event) => {
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

    // Handles creating of the inital question when the question type  button was clicked
    const handleCreateQuestion = async (questionType, sortOrder) => {
        if (!isCreatingQuestion) {
            try {
                clearQuestionDetails();

                console.log("CREATING..");
                setIsCreatingQuestion(true);

                // Set the initial question details
                // to immidiately open the form and not wait
                // from the response of the back end
                setQuestionDetails({
                    is_required: false,
                    question: "Question",
                    question_points: 0,
                    question_type: questionType,
                    sort_order: 1,
                });

                // Create he intial option with temporary id for multiple choice type of question
                const newOption = {
                    option_temp_id: `${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                    option_text: "Option 1",
                    is_correct: false,
                };
                // Set the inital to imeediately dispaly in the front end
                setQuestionOptions([newOption]);

                const response = await axios.post(
                    route("assessment.quiz-form.question.create", {
                        assessment: assessmentId,
                        quiz: quiz.quiz_id,
                    }),
                    {
                        question_type: questionType,
                        sort_order: sortOrder,
                    }
                );
                console.log(response);
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
                                      response.data.data.options
                                          .question_option_id,
                                  question_id:
                                      response.data.data.options.question_id,
                              }
                            : opt
                    )
                );

                // This reset the state which is use to determine if the user updates the
                // details of the question
                setIsCreatingQuestion(false);
            } catch (error) {
                console.error(error);
                // Clear the question details
                // this also forces the form to close immediately
                setQuestionDetails(null);
                setIsCreatingQuestion(false);
            }
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

            // Ensures no empty option
            const updatedOptions = questionOptions.map((option, i) =>
                option.option_text.trim() === ""
                    ? { ...option, option_text: `Option ${i + 1}` }
                    : option
            );

            // Enusres question is not empty
            const updatedQuestionDetails =
                questionDetails.question.trim() === ""
                    ? { ...questionDetails, question: "Question" }
                    : questionDetails;

            setQuestionList((prev) => [
                ...prev,
                { ...updatedQuestionDetails, options: updatedOptions },
            ]);

            setQuestionDetails(null);
            setQuestionOptions([]);
            setIsQuestioNDetailsChanged(false);
        }
    };

    useEffect(() => console.log(questionList), [questionList]);

    useEffect(() => console.log(quizDetails), [quizDetails]);

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
                                        items={questionList.map(
                                            (q) => q.question_id
                                        )}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {questionList.map((question, i) => (
                                            <Question
                                                key={question.question_id}
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

                        {/* Display the question form */}
                        {questionDetails && (
                            <div ref={targetForm}>
                                <QuestionForm
                                    key={questionList.length}
                                    isChanged={isQuestioNDetailsChanged}
                                    setIsChanged={setIsQuestioNDetailsChanged}
                                    questionDetails={questionDetails}
                                    setQuestionDetails={setQuestionDetails}
                                    questionOptions={questionOptions}
                                    setQuestionOptions={setQuestionOptions}
                                    quizTotalPoints={quizTotalPoints}
                                    activeForm={activeForm}
                                    setActiveForm={setActiveForm}
                                    setSelectedIndex={setSelectedIndex}
                                />
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
                                            handleCreateQuestion(
                                                "multiple_choice",
                                                questionList.length + 1
                                            )
                                        }
                                        width={"w-full"}
                                        text={"Multiple Choice"}
                                    />
                                </div>

                                <div ref={truOrFalseRef}>
                                    <SecondaryButton
                                        doSomething={() => {
                                            clearQuestionDetails();
                                            handleOpenQuestionForm(
                                                "trueOrFalse"
                                            );
                                            handleQuestionDetailsChange(
                                                "questionType",
                                                "trueOrFalse"
                                            );
                                        }}
                                        width={"w-full"}
                                        text={"True or False"}
                                    />
                                </div>

                                <div ref={indentificationRef}>
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
        </div>
    );
}

QuizForm.layout = null;
