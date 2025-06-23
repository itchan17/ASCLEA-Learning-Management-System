import React, { useEffect, useState } from "react";
import SinglePage from "../../../../../../Components/Layout/SInglePage";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import TextEditor from "../../TextEditor";
import useCreateQuizStore from "../../../../../../Stores/Programs/CourseContent/createQuizStore";
import Question from "./Question";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import MultipleChoiceForm from "./MultipleChoiceForm";

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

    const [openQuestionForm, setOpenQuestionForm] = useState({
        multipleChoice: false,
        trueOrFalse: false,
        indeftification: false,
    });

    const handleOpenQuestionForm = (questionType) => {
        console.log("Clicked");
        handleQuestionDetailsChange("questionType", questionType);
        if (questionType === "multiple_choice") {
            setOpenQuestionForm({
                multipleChoice: !openQuestionForm.multipleChoice,
                trueOrFalse: false,
                indeftification: false,
            });
        }
    };
    useEffect(() => {
        console.log(quizDetails);
        console.log(`QUESTION LIST: ${questionList}`);
    }, [quizDetails, questionList]);
    return (
        <SinglePage>
            <div className="w-full max-w-235 space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-size6 font-bold">Create Quiz</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                            />
                            <span className="text-ascend-black font-bold">
                                Show answers after
                            </span>
                        </div>

                        <PrimaryButton text={"Save Quiz"} />
                    </div>
                </div>
                <div className="w-full border border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
                    <div className="font-bold text-end">Total points: 10</div>
                    <div>
                        <label>
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
                    <div>
                        <label>Description</label>
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
                            {questionList.map((question, i) => (
                                <Question
                                    key={i}
                                    questionDetails={question}
                                    questionNumber={i + 1}
                                />
                            ))}
                        </div>
                    )}
                    <div>
                        {openQuestionForm.multipleChoice && (
                            <MultipleChoiceForm />
                        )}
                    </div>
                    <div className="space-y-5">
                        <h1 className="font-bold">Select Type of Question</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <SecondaryButton
                                doSomething={() =>
                                    handleOpenQuestionForm("multiple_choice")
                                }
                                width={"w-full"}
                                text={"Multiple Choice"}
                            />
                            <SecondaryButton
                                width={"w-full"}
                                text={"True or False"}
                            />
                            <SecondaryButton
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
